# Facebook Messenger Cinema Chatbot

Welcome to the Facebook Messenger Cinema Chatbot, a sophisticated AI-powered assistant designed to revolutionize the way users discover and book movie tickets. Leveraging geolocation, this chatbot provides personalized cinema recommendations, movie showtimes, trailers, and enables ticket booking at user-preferred cinemas. It also offers a subscription service for updates on upcoming movie releases.

## Features

- **Movie Discovery**: Finds nearby cinemas based on user geolocation.
- **Showtimes and Trailers**: Shares movie showtimes and trailers to help users make informed decisions.
- **Ticket Booking**: Facilitates ticket booking for the selected movie at a preferred cinema.
- **Upcoming Movies Subscription**: Allows users to subscribe and receive recommendations for upcoming movies.
- **Natural Language Processing**: Employs wit.ai to understand and process user queries effectively.
- **Integration with MovieGlu**: Accesses extensive movie metadata from MovieGlu for accurate information.

## Technologies Used

- **Node.js**: Powers the backend of the application.
- **wit.ai**: Processes natural language, enabling the chatbot to understand user inquiries.
- **Facebook Graph API**: Manages data exchange with the Facebook Messenger platform.
- **MovieGlu API**: Retrieves detailed movie metadata.
- **MongoDB**: Stores information about subscribed users.
- **ngrok**: Exposes local servers to the internet, facilitating local development.

## Getting Started

### Setup

1. **Configuration**: Initialize configuration parameters in `config/default.json`. Refer to `app.js` for parameter descriptions. Environment variables can also be set as defined in `app.js`.

### Running the Project

1. **Starting the Server**: Use `npm start` to launch the server. For local development, ensure ngrok is installed to expose your server to the internet.
2. **Webhook Requirements**: A public URL (SSL-certified by a recognized authority) is necessary for Facebook servers to reach your webhook. Refer to Facebook's [Webhook Setup Documentation](https://developers.facebook.com/docs/graph-api/webhooks#setup) for more details.

### Webhook Implementation

- The webhook implementation is detailed in `app.js`, routing to `/webhook`.
- It handles authentication, message processing, delivery confirmations, and postbacks.
- For extensive details, visit the [Facebook Webhook Reference](https://developers.facebook.com/docs/messenger-platform/webhook-reference).

## Important Note

- **Developer Dashboard Configuration**: The chatbot requires author configuration through the Facebook Developer Dashboard to be operational. It is not publicly available on Facebook Messenger without this setup.
