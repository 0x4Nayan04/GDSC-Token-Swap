## Token-Swap
⚠️ **Note:** Due to some technical issues (possibly due to a 1inch API issue), this code is currently not working. Additionally, I don't have real MATIC to perform testing. I am working on fixing these issues. 🚧

## Description

Token-Swap is a Next.js project that enables users to swap Matic tokens for either USDC or WETH tokens. It integrates with the 1inch API to fetch real-time conversion rates, allowing users to see the swap conversion price before executing the transaction. This project is built with a focus on simplicity and efficiency, providing a seamless user experience for cryptocurrency enthusiasts looking to exchange their assets.




## Features

- **Token Swapping**: Swap Matic tokens for USDC or WETH tokens directly from your wallet.
- **Real-time Conversion Rates**: Fetch and display the current conversion rates for your swap, ensuring you get the best possible deal.
- **User Authentication**: Securely sign in and manage your transactions with NextAuth integration.
- **Responsive Design**: A clean and responsive UI that looks great on all devices.

## Preview of the Page

![Screenshot_88](https://github.com/0x4Nayan04/GDSC-Token-Swap/assets/137928762/a62014b3-ff0d-4e59-b640-facb5a343971)


## Technologies Used

- **Next.js**: A powerful React framework that enables server-side rendering and static site generation.
- **React**: For building the user interface components.
- **Moralis and Wagmi hooks**: For state management and fetching blockchain data.
- **NextAuth**: For handling user authentication, providing a secure and seamless login experience.
- **1inch API**: Powers the swap functionality, called through a serverless function within the Next.js API routes.
- **CSS**: For styling the application and ensuring a responsive design.

## Local Setup

To set up this project locally, follow these steps:

1. Clone the repository:

```sh
git clone https://github.com/0x4Nayan04/GDSC-Token-Swap
```

2. Install dependencies:

```
yarn install
```

3. Create a `.env.local` file in the root directory and add the following environment variables:

```
MORALIS_API_KEY=
APP_DOMAIN=amazing.finance
NEXTAUTH_URL=http://localhost:4000
NEXTAUTH_SECRET=
```

4. Obtain the `MORALIS_API_KEY` from the [Moralis dashboard](https://moralis.io/).

5. Generate a `NEXTAUTH_SECRET` by running the following command in your terminal:

```
openssl rand -base64 32
```

6. Start the development server:

```
yarn dev
```

7. Open your browser and navigate to `localhost:4000`

## Usage

Connect your Web3 wallet (e.g., MetaMask) to the Polygon network.
Use the interface to select the amount of MATIC you want to swap.
Choose either USDC or WETH as the token you want to receive.
View the real-time conversion rate.
Confirm the swap and approve the transaction in your wallet.

## Contributing

Contributions are welcome! If you have any improvements or bug fixes, please feel free to fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.

## Acknowledgements

This project was developed as part of the Google Developer Student Clubs (GDSC) initiative.
Special thanks to Moralis and 1inch for providing the necessary APIs and tools.
