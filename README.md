# R3F RPG

## TODO

- Navmesh (extract as JSON?)
- Aggro system
- Characters, weapons
- Detect Collisions
- Sprite effects
- Bake lighting and shadows into the map
- Systems unit test
- Local storage based auth
- Use rotation/position velocities in camera and controls logic to not be frame dependent.
- Discord, GitHub auth, password auth, maybe with [Lucia](https://lucia-auth.com/getting-started/) or [Clerk](https://clerk.com/). Or try making the Next Auth cookies same site false.
- Fix Jump that cannot be pressed while holding joysticks.

- Fix local debugging:

## Bugs

Local debugging via direct IP address (for mobile) is broken (on Mini Mana too). Seems like a Three.js issue.

http://localhost:3000/ and http://127.0.0.1:3000/ both load palette.png correctly but http://192.168.48.28:3000/ doesn't even try to fetch it.

It doesn't work with Tailscale either. It loads GLBs but not textures.

Use ngrok.
