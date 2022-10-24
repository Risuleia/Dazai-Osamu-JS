// dependecnies
const express = require("express");
const url = require("url");
const path = require("path");
const { Permissions } = require("discord.js");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const Strategy = require("passport-discord").Strategy;
const BotConfig = require("../config.json");
const Settings = require("./settings.json");
const passport = require("passport");

// server function
const alive = async bot => {
	const server = express()
	const session = require("express-session");
	const MemoryStore = require("memorystore")(session);
	
	//Initalize the Discord Login
	passport.serializeUser((user, done) => done(null, user))
	passport.deserializeUser((obj, done) => done(null, obj))
	passport.use(new Strategy({
			clientID: Settings.config.clientID,
			clientSecret: process.env.secret || Settings.config.secret,
			callbackURL: Settings.config.callback,
			scope: ["identify", "guilds", "guilds.join"]
	},
	(accessToken, refreshToken, profile, done) => {
			process.nextTick(() => done(null, profile))
	}
	))

	server.use(session({
			store: new MemoryStore({checkPeriod: 86400000 }),
			secret: `#@%#&^$^$%@$^$&%#$%@#$%$^%&$%^#$%@#$%#E%#%@$FEErfgr3g#%GT%536c53cc6%5%tv%4y4hrgrggrgrgf4n`,
			resave: false,
			saveUninitialized: false
		})
	)

	// middleware
	server.use(passport.initialize());
	server.use(passport.session());

	server.set("view engine", "ejs");
	server.set("views", path.join(__dirname, "./views"));


	server.use(bodyParser.json());
	server.use(bodyParser.urlencoded({
			extended: true
		})
	);
	server.use(express.json());
	server.use(express.urlencoded({
			extended: true
		})
	);
	
	// static files
	server.use(express.static(path.join(__dirname, "./public")));

	// get requests
	const checkAuth = async (req, res, next) => {
			if (req.isAuthenticated()) return next();
			req.session.backURL = req.url;
			res.redirect("/login");
	}
	server.get("/login", (req, res, next) => {
		// res.header("Access-Control-Allow-Origin", "https://dazai-osamu-1.risuleia.repl.co");
			if (req.session.backURL) {
					req.session.backURL = req.session.backURL
			} else if (req.headers.referer) {
					const parsed = url.parse(req.headers.referer);
					if (parsed.hostname == server.locals.domain) {
							req.session.backURL = parsed.path
					}
			} else {
					req.session.backURL = "/"
			}
			next();
			}, passport.authenticate("discord", {
					prompt: "none"
				})
	);
	server.get("/logout", async (req, res) => {
        req.session.destroy(()=>{
            req.logout();
            res.redirect("/");
        })
    })

	server.get("/callback", passport.authenticate("discord", { failureRedirect: "/" }), async (req, res) => {
		res.redirect('https://dazai-osamu-1.risuleia.repl.co')
	});

	server.get('/', async (req, res) => {
		res.header("Access-Control-Allow-Origin", "https://dazai-osamu-1.risuleia.repl.co");
	  res.render('home', {
			state: 'Home',
			title: "Dazai Osamu Bot",
			ping: bot.ws.ping,
			req: req,
			user: req.isAuthenticated() ? req.user : null,
			users: bot.users.cache.size,
			guilds: bot.guilds.cache.size,
			commands: bot.commands.size,
			devs: {
				miv: await bot.users.fetch('497959318310748181'),
				mimi: await bot.users.fetch('800686782114693180')
			}
		})
	})

	server.get('/invite', async (req, res) => {
		res.redirect('https://discord.com/api/oauth2/authorize?client_id=937307272433000509&permissions=1644972474359&scope=bot%20applications.commands')
	})
	
	server.get('/home', async (req, res) => {
	  res.redirect('/')
	})
	
	server.get('/docs', async (req, res) => {
	  res.render('docs', {
			state: 'Documentation',
			title: "Documentation",
			commands: bot.commands,
			req: req,
			user: req.isAuthenticated() ? req.user : null,
		})
	})
	server.get('/documentation', async (req, res) => {
		res.redirect('/docs')
	})
	
	server.get('/dashboard', async (req, res) => {
	  res.render('dashboard', {
			state: 'Dashboard',
			title: "Dashboard",
			req: req,
			user: req.isAuthenticated() ? req.user : null,
		})
	})

	server.get('/api', async (req, res, next) => {
		res.header("Access-Control-Allow-Origin", "https://dazai-osamu-1.risuleia.repl.co");
		res.header("Access-Control-Allow-Credentials", true)
		res.send({
			user: req.user,
			ping: bot.ws.ping,
			users: bot.users.cache,
			guilds: bot.guilds.cache,
			commands: bot.commands,
			devs: {
				miv: await bot.users.fetch('497959318310748181'),
				mimi: await bot.users.fetch('800686782114693180')
			}
		})
	})
	server.get('/api/servers', async (req, res, next) => {

		const allowedGuilds = () => {
			const user = req.user;
			if (!req.user) return null
	
			const guilds = bot.guilds.cache;
			const servers = guilds
				.filter(guild => {
					const permsOnGuilds = new Permissions(guild.permissions_new)
					if (permsOnGuilds.has(Permissions.FLAGS.MANAGE_GUILD)) return guild
				})
			return servers
		}

		res.header("Access-Control-Allow-Origin", "https://dazai-osamu-1.risuleia.repl.co");
		res.header("Access-Control-Allow-Credentials", true)
		res.send({
			guilds: allowedGuilds()
		})
	})

	server.get('/api/auth', (req, res, next) => {
		res.header("Access-Control-Allow-Origin", "https://dazai-osamu-1.risuleia.repl.co");
		res.send(req.user)
	})
	
	server.post('/api', async (req, res, next) => {
		res.header("Access-Control-Allow-Origin", "https://dazai-osamu-1.risuleia.repl.co");
		res.header("Access-Control-Allow-Methods", "https://dazai-osamu-1.risuleia.repl.co");
		next()
	})
	
	server.listen(3000)
}

module.exports = alive