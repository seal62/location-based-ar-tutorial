// getting places from APIs
function loadPlaces(position) {
  // const params = {
  //     radius: 300,    // search places not farther than this value (in meters)
  //     clientId: '<YOUR-CLIENT-ID>',
  //     clientSecret: 'YOUR-CLIENT-SECRET',
  //     version: '20300101',    // foursquare versioning, required but unuseful for this demo
  // };

  // // CORS Proxy to avoid CORS problems
  // const corsProxy = 'https://cors-anywhere.herokuapp.com/';

  // // Foursquare API (limit param: number of maximum places to fetch)
  // const endpoint = `${corsProxy}https://api.foursquare.com/v2/venues/search?intent=checkin
  //     &ll=${position.latitude},${position.longitude}
  //     &radius=${params.radius}
  //     &client_id=${params.clientId}
  //     &client_secret=${params.clientSecret}
  //     &limit=30 
  //     &v=${params.version}`;
  // return fetch(endpoint)
  //     .then((res) => {
  //         return res.json()
  //             .then((resp) => {
  //                 return resp.response.venues;
  //             })
  //     })
  //     .catch((err) => {
  //         console.error('Error with places API', err);
  //     })

  // -33.758636, 150.900759
  return [
    {
      location: {
        lat: -33.755838,
        lng: 150.901260,
      },
      name: 'marker 1',
      colour: 'blue'
    },
    {
      location: {
        lat: -33.755791,
        lng: 150.900653,
      },
      name: 'marker 2',
      colour: 'green'
    },
    {
      location: {
        lat: -33.760092,
        lng: 150.899820,
      },
      name: 'marker 3',
      colour: 'yellow'
    }
  ]
};


window.onload = () => {
  const scene = document.querySelector('a-scene');

  // first get current user location
  return navigator.geolocation.getCurrentPosition(function (position) {

    // than use it to load from remote APIs some places nearby
    // loadPlaces(position.coords)
    //   .then((places) => {
    //     places.forEach((place) => {
      loadPlaces().forEach((place) => {
          const latitude = place.location.lat;
          const longitude = place.location.lng;

          // add place name
          const placeText = document.createElement('a-sphere');
          placeText.setAttribute('gps-new-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
          placeText.setAttribute('title', place.name);
          // placeText.setAttribute('scale', '0.5 0.5 0.5');
          placeText.setAttribute('radius', 0.5);
          placeText.setAttribute('material', 'color: ' + place.colour);
          
          placeText.addEventListener('loaded', () => {
            console.log("loaded place text")
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
          });

          scene.appendChild(placeText);
        });
      // })
  },
  (err) => console.error('Error in retrieving position', err),
  {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 27000,
  });
};