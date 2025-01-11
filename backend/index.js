require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const fetch = require('node-fetch'); // To make API calls for GraphQL mutations
const typeDefs = require('./typeDefs/schema');
const resolvers = require('./resolvers');
const authMiddleware = require('./utils/auth');

const startServer = async () => {
  const app = express();

  // Middleware to parse URL-encoded form data
  app.use(express.urlencoded({ extended: true }));

  // REST endpoint to serve the password reset form
  app.get('/reset-password/:token', (req, res) => {
    const { token } = req.params;

    if (!token) {
      return res.status(400).send('Invalid or missing reset token');
    }

    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Reset Password</title>
      </head>
      <body>
        <h1>Reset Your Password</h1>
        <form method="POST" action="/submit-reset-password">
          <input type="hidden" name="resetToken" value="${token}" />
          <div>
            <label for="newPassword">New Password:</label>
            <input type="password" id="newPassword" name="newPassword" required />
          </div>
          <button type="submit">Reset Password</button>
        </form>
      </body>
      </html>
    `);
  });

  // REST endpoint to handle password reset form submission
  app.post('/submit-reset-password', async (req, res) => {
    const { resetToken, newPassword } = req.body;

    if (!resetToken || !newPassword) {
      return res.status(400).send('Missing required fields');
    }

    try {
      // Call the resetPassword GraphQL mutation
      const response = await fetch(`https://taskserver-squadra.onrender.com/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation forgotPassword($resetToken: String!, $newPassword: String!) {
              resetPassword(resetToken: $resetToken, newPassword: $newPassword)
            }
          `,
          variables: { resetToken, newPassword },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      res.send(`
        <h1>Password Reset Successful</h1>
        <p>Your password has been reset. You can now log in with your new password.</p>
      `);
    } catch (error) {
      res.status(500).send(`
        <h1>Error</h1>
        <p>${error.message}</p>
      `);
    }
  });

  // Apollo Server setup
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const user = await authMiddleware(req);
      return { user };
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  // Connect to MongoDB
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection failed:', err.message));

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer();
