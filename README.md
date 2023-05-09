<h3 align="center">Home Location Feature API</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()

</div>

## Documentation

The documentation for the features implemented is available [here](https://documenter.getpostman.com/view/20654215/2s93eZwqsJ)

## Request Body

```JSON
{
  "name": "Cozy Apartment",
  "description": "A comfortable apartment with a great view of the city",
  "address": "123 Main Street",
  "city": "Anytown",
  "state": "CA",
  "zipCode": "12345",
  "coordinates": {
    "type": "Point",
    "coordinates": [-122.123456, 37.123456]
  },
  "images": [
    "image1.jpg",
    "image2.jpg",
    "image3.jpg"
  ]
}

```

### Success Response Body

```JSON
{
    "action": "/v1/user/home-locations",
    "code": 200,
    "status": true,
    "data": {
        "name": "Cozy Apartment",
        "address": "123 Main Street",
        "city": "Anytown",
        "state": "CA",
        "zipCode": "12345",
        "images": [
            {
                "url": "https://res.cloudinary.com/dxqeedmxk/image/upload/v1683620613/Reviews/rfllzaa1vixxop2xm50p.jpg",
                "public_id": "Reviews/rfllzaa1vixxop2xm50p",
                "_id": "645a03064b8b3ea534d2191f"
            },
            {
                "url": "https://res.cloudinary.com/dxqeedmxk/image/upload/v1683620615/Reviews/gnife5zxxju43okpcfel.jpg",
                "public_id": "Reviews/gnife5zxxju43okpcfel",
                "_id": "645a03064b8b3ea534d21920"
            }
        ],
        "description": "A comfortable apartment with a great view of the city",
        "_id": "645a03064b8b3ea534d2191e",
        "__v": 0
    },
    "message": "Success"
}
```

## Recommendations

1.
