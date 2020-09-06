## DEPRECATED - A NEW VERSION IS BEING REBUILT

Note: API Key to facilitate the GET requests are removed prior to commits

The app searches up current and future weather forecasts using API calls from openweathermap.org. The requests are serviced through a django server to prevent overcalling the API (by storing the information and only calling updates if the information is outdated by an hour). The backend django server services the front end react application through the use of Django REST framework and the React application dynamically changes its display depending on which city is selected.

## Django Server

The repository includes the Django backend that now facilitates the current weather API requests. Go to server\MyWeatherApp, go into env\Scripts and use activate.bat, then go into server\MyWeatherApp\MyWeatherApp and run

### `python manage.py runserver`

Runs the server that interfaces with the react app

## React Frontend

In the main project directory, run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
