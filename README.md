# :fork_and_knife: WYE - What ya eatin'?

## Back-end

### Dependencies

- Python 3
- [Flask](https://flask.palletsprojects.com/en/1.1.x/)
- [Flask-RESTful](https://flask-restful.readthedocs.io/en/latest/)
- [Flask-RestX](https://flask-restx.readthedocs.io/en/latest/index.html)
- [Peewee](http://docs.peewee-orm.com/en/latest/)
- [Click](https://click.palletsprojects.com/en/8.0.x/)
- [Unidecode](https://pypi.org/project/Unidecode/)

Install all the dependencies with:
```bash
pip install -r requirements.txt
```

## Launching the server

Launch the server with: 
```bash
python app.py
```

## Front-end

### Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

##### Available Scripts

In the project directory, you can run:

-  `yarn start`

    Runs the app in the development mode.\
    Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

    The page will reload when you make changes.\
    You may also see any lint errors in the console.

-  `yarn test`

    Launches the test runner in the interactive watch mode.\
    See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

-  `yarn build`

    Builds the app for production to the `build` folder.\
    It correctly bundles React in production mode and optimizes the build for the best performance.

    The build is minified and the filenames include the hashes.\
    Your app is ready to be deployed!

    See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

-  `yarn eject`

    **Note: this is a one-way operation. Once you `eject`, you can't go back!**

    If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

    Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

    You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### Running the app in development

Run the app with:

```bash
yarn start
```

Then go to http://127.0.0.1:3000.

### Building and the app with PWA requirements

In `package.json`, replace the `start` field with :

```json
"start": "export HTTPS=true&&PORT=3000 react-scripts start",
```

Build the app with: 

```bash
yarn build
```

Launch the built app with:

```bash
serve -s build
```

Then go to https://127.0.0.1:8443.

### Run Lighthouse diagnostic

Install [Lighthouse](https://developers.google.com/web/tools/lighthouse) with:

```bash
npm install -g lighthouse
```

Then run:

```
lighthouse --chrome-flags="--ignore-certificate-errors"  --view https://127.0.0.1:8443
```