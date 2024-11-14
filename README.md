## Gaming heaven challenge

Live: 🔗 https://nico-bt-gaming-heaven.vercel.app/

Techs used:
- Nextjs
- Typescript
- Tailwind, Shadcn
- Prisma ORM + Supabase
- LottieFiles for small animations (Mario, Tetris and Gameboy Loader)

I took the liberty of, instead using local storage, use a database to store users and its games.  
With authentication and authorization protecting all routes except login and signup.  
Following the model below:

## Entity Relationship Diagram
![Entities Diagram](https://github.com/user-attachments/assets/9bc73bad-1344-4702-ae13-1375564037d3)

## Overall flow of signup or login:  
![auth drawio](https://github.com/user-attachments/assets/9c7130ec-6608-452e-b88e-fe94ef37c34b)

With a session cookie you can access the app.  
Routes "/" and "/games/[gameId]/[slug]" are protected.  
Now you can:
- Search for games using igbd api
- Get and delete games saved that belongs to the corresponding logged user

## Simplified flow
![app drawio](https://github.com/user-attachments/assets/28ed7ca1-811b-4a52-9613-d83c46267468)

## Comments
- Followed the "Next way" of using server actions and getting direct access to db via Server Components.  
I did not create a separate api to access via client side  

- Sort selection for saved games is mantained via url params.  
Once you sort your games they stay that way when you navigate back and fort, convenient for checking dates or other related data and not having to select your sort type again  

- Added metadata and dynamic metadata for details page.  

- Routes are protected via middleware, if you don't have a valid session you are redirected to login  

- Getting saved games from db is cached and getting game details has request memoization  

- When a session is created a new token is requested to IGBD with my credentials stored in enviromental variables.  
  Session_expiration < Token_expiration ensuring that the token is always valid and not expired. User session will expire first  

- I've used Next Image component for some images, but for others I've used the native "img" with srcset, using the different image sizes url endpoints that the igbd api already provides.  
Avoiding spending Vercel quota for optimizing images.  

- I've kept the server actions files close to where they are used. Other option could be a separate folder on src root.
  
- For dynamic routes, I've incorporated the slug of the game in the url, but also mantained the id (I think searching by id could be more efficient for db queries ?)

🎮 Hope you like it!  

