$( document ).ready(function() {
    console.log( "ready!" );
	var polygonsData=[], polygonsDataItem;
	var projectionsdata;
	var countriesapi = "https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson";
	$.ajax({
		  dataType: "json",
		  url: countriesapi,
		  async: false, 
		  success: function(rsp) {
					//console.log( rsp );
					
				$.ajax({
						dataType: "json",
						url: "https://raw.githubusercontent.com/UT5123/CASA0005_GIS_Final-Project/main/projections_target.json",
						async: false,
						success: function (projections) {
							projectionsdata=projections;
							console.log(projections[0]);
						}
					});
					
				var country_isoa3;
				var country_name;
				var country_geometry;
			  $.each( rsp.features, function( i, country ) {
				country_isoa3 = country.properties.ISO_A3;
				country_name = country.properties.BRK_NAME;
				//console.log( country_isoa3 );
				country_geometry = country.geometry;
				//console.log(country_geometry);
				
				var country_projections = projectionsdata.filter( element => element.Country == country_name);
				var year2030;
				//console.log(country_projections);
				if(country_projections.length > 0) year2030=country_projections[0].Year_2030;
				else year2030 = null;
				//console.log(year2030);

				
				var climateapi = "https://www.climatewatchdata.org/api/v1/data/historical_emissions?regions="+country_isoa3;
				//console.log(climateapi);
				var last;
				$.ajax({
				  dataType: "json",
				  url: climateapi,
				  async: false, 
				  success: function(rsp2) {
					//console.log( rsp2 );
					//console.log( country_name, country_isoa3 );
					if(rsp2.data.length > 2){
					  $.each( rsp2.data[1].emissions, function( j, emission ) {
						  				//console.log( emission );
						last=emission;
					  });
					  //console.log( last ); 

					
					
					  polygonsDataItem = {"data":{}};
						polygonsDataItem["type"] = "Feature";
						polygonsDataItem["geometry"] = country_geometry;
						polygonsDataItem["data"]["Name"] = country_name;
						polygonsDataItem["data"]["Year"] = last.year;
						polygonsDataItem["data"]["Value"] = last.value;
						polygonsDataItem["data"]["Year_2030"] = "2030";
						polygonsDataItem["data"]["Value_2030"] = year2030;
						polygonsData.push(polygonsDataItem);
					}
				  }
				});
				
				
				
				
				
			  });
			  
		  }
		});
		
	//console.log( polygonsData );
	// Gen random data
  	const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlOrRd);
      const world = Globe()
      .globeImageUrl('https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg')
      .backgroundImageUrl('https://cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png')
      .polygonsData(polygonsData)
      .lineHoverPrecision(0)
        .polygonAltitude(0.06)
        .polygonCapColor(() => '#888')
        .polygonSideColor(() => 'rgba(0, 100, 0, 0.15)')
        .polygonStrokeColor(() => '#111')
        .polygonLabel(({ data: d }) => `
          <b>${d.Name}:</b> <br />
          Year: <i>${d.Year}</i> <br />
          Value: <i>${d.Value} <br /></i>
		  Projected 2030: <i>${d.Value_2030}</i> 
        `)
        .onPolygonHover(hoverD => world
          .polygonAltitude(d => d === hoverD ? 0.12 : 0.06)
          .polygonCapColor(d => d === hoverD ? 'steelblue' : '#888')
        )
        .polygonsTransitionDuration(300)
    (document.getElementById('globeViz'))
	
});