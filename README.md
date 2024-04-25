# SETUP

Create .env file in the root of the repository and add a connection string.

DB_URL=mongodb://localhost:27017

DB_NAME=news

PORT=3000

After that is done simple `docker compose up` is enough to start the service.

# Design Choices

I have not added tests due to time limitations, however I do believe the code is made to be easily testable.

1. Using classes instead of function calls to be simpler to separate and group testing
2. Classes depend on interfaces and you can pass their dependencies so they can be easily mocked.

I have decided to go with more robust validation that is yet not complete. Can be seen in `NewsValidatorService`.

