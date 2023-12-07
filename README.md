# Single Value Sparkline

Single Value Sparkline custom visualization for 2023 Looker Hackathon

## Getting Started

### Install Dependencies

```sh
$> yarn
```

### Environment Variables

Copy `.env.sample` into `.env` in the root of the project and add your Looker client id / secret values for `STORYBOOK_LOOKER_CLIENT_ID` and `STORYBOOK_LOOKER_CLIENT_SECRET`. These variables will allow Storybook to retrieve an access token from your Looker instance for API requests, i.e. testing directly with Looker data from Storybook.

---

## Running Locally

Start up the Webpack express server. This will allow you to interact with Looker's API provided your environment variables are set correctly.

```sh
$> yarn start:server
```

Fire up Storybook. It should open automatically on port 6006.

```sh
$> yarn storybook
```

---

## Building

This repository is designed to build any/all of your visualizations individually into self-contained files. See the `entry` property of `webpack.prod.config.ts`

```sh
$> yarn build
```

---

## Testing Your Visualization in Looker from Local Dev

(1) Install [mkcert](https://github.com/FiloSottile/mkcert) utility (Homebrew, etc.)

(2) Generate `key.pem` and `cert.pem` files somewhere in your home directory:

`$> mkcert -key-file key.pem -cert-file cert.pem localhost 127.0.0.1`

You should see a response similar to the following:

```
Created a new certificate valid for the following names 📜
 - "localhost"
 - "127.0.0.1"

The certificate is at "cert.pem" and the key at "key.pem" ✅

It will expire on 20 June 2025 🗓
```

(3) Run `yarn build` to build your wrapped Looker visualization(s)

(4) In Looker's Admin section, add your new visualization. The URL of your visualization should be something like `https://127.0.0.1:5150/webpackGeneratedNameOfYourViz.js`

(5) Change to the `build` directory and using `npx`, fire up `http-server` with the correct paths to your key and cert files.

```
$> cd build
$> npx -y http-server --cors -p 5150  -S -C ~/path/to/your/cert.pem -K ~/path/to/your/key.pem  # long live EVH
```

---

## Notes

To decouple reusable charting components from the Looker query response structure, **higher-order components** (HOCs) have been implemented to execute runtime data transformation of Looker results into a format acceptable for each charting component. See the `hoc` directory and feel free to ask questions.
