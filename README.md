# blog-info
# Project Description
As a Full Stack JavaScript specialist, we invite you to join our development team. Your mission will be to play a central role in our blog project, focusing on the Latest Developments in the World of Information Technology. Your expertise in web development, particularly in Node.js combined with a template engine, will enrich our project with a remarkable and efficient user experience.

# Features

    1. Authentication
        Sign Up: Register a new user.
        Login: Authenticate users.
        Logout: Log users out.

    2. Article Management
        Create Article: Create a new article (title, content, creation date).
        List Articles: Display a list of all articles.
        View Article: Display detailed information about an article.
        Edit Article: Modify an article (by its author only).
        Delete Article: Delete an article (by its author only).

    3. Comments
        Add Comments: Allow users to add comments to an article.
        Display Comments: Show comments under an article.
        Delete Comments: Enable users to delete their own comments.
        
    4. User Profile
        Display and Modify Profile: Show and allow users to modify profile information (name, email, photo, etc.).
        List User Articles: Display a list of articles created by the user.

##### Commands to run project

    1. install the project dependencies:   npm install
    2. configure your darabase info in the env file
    3. you should run migration:           npx prisma migrate dev 
    4. run prismate client to map the models with the database tables: prisma generate
    5. start the project:                  node index.js OR npm run dev
