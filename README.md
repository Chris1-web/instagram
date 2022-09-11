# pages

1. Login
2. Sign up
3. Home
4. profile
5. edit profile
6. post detail

# components

1. form --- includes form tag children and footer
2. post
3. profile image
4. saved
5. navbar
6. button

icons from flatIcons

A funny experience was that after deploying this app to github pages,
Only the loading screen was showing. the useEffect hooks and other hooks
didn't take effect. I was stuck on this from Friday evening to Sunday Morning.
I thought that useNavigate method that should be called onComponentMount
doesn't work on github pages, but after scanning through my code,
I realise that I only defined the getUser function, I did not invoke it.
This had work in development, but not in production.
