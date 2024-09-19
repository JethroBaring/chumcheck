export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["aboutus.svg","acceptance.png","calculator.png","data-privacy.png","eligibility-agreement.png","email.png","group-information.png","images/placeholder.jpg","images/placeholder.png","investment.png","launchlab_logo.png","login.png","loginv1.svg","loginv2.svg","logo copy.png","logo.png","market.png","organizational.png","project-details.png","register.svg","regulatory.png","rocketship.png","sample.pdf","startup copy.png","startup.png","startup.svg","tasks.svg","technology.png"]),
	mimeTypes: {".svg":"image/svg+xml",".png":"image/png",".jpg":"image/jpeg",".pdf":"application/pdf"},
	_: {
		client: {"start":"_app/immutable/entry/start.BUSVZjWT.js","app":"_app/immutable/entry/app.B-1n-bLf.js","imports":["_app/immutable/entry/start.BUSVZjWT.js","_app/immutable/chunks/entry.BUvncCIv.js","_app/immutable/chunks/scheduler.C5Rd-ZIZ.js","_app/immutable/chunks/index.NQB3_1Bs.js","_app/immutable/entry/app.B-1n-bLf.js","_app/immutable/chunks/scheduler.C5Rd-ZIZ.js","_app/immutable/chunks/index.GzWkxjRN.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js')),
			__memo(() => import('./nodes/12.js')),
			__memo(() => import('./nodes/13.js')),
			__memo(() => import('./nodes/14.js')),
			__memo(() => import('./nodes/15.js')),
			__memo(() => import('./nodes/16.js')),
			__memo(() => import('./nodes/17.js')),
			__memo(() => import('./nodes/18.js')),
			__memo(() => import('./nodes/19.js')),
			__memo(() => import('./nodes/20.js')),
			__memo(() => import('./nodes/21.js')),
			__memo(() => import('./nodes/22.js')),
			__memo(() => import('./nodes/23.js')),
			__memo(() => import('./nodes/24.js')),
			__memo(() => import('./nodes/25.js')),
			__memo(() => import('./nodes/26.js')),
			__memo(() => import('./nodes/27.js')),
			__memo(() => import('./nodes/28.js')),
			__memo(() => import('./nodes/29.js')),
			__memo(() => import('./nodes/30.js')),
			__memo(() => import('./nodes/31.js')),
			__memo(() => import('./nodes/32.js')),
			__memo(() => import('./nodes/33.js')),
			__memo(() => import('./nodes/34.js')),
			__memo(() => import('./nodes/35.js'))
		],
		routes: [
			{
				id: "/(app)",
				pattern: /^\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/(auth)/forgotpassword",
				pattern: /^\/forgotpassword\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/(auth)/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/(auth)/logout",
				pattern: /^\/logout\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/(protected)/manager/dashboard/pending",
				pattern: /^\/manager\/dashboard\/pending\/?$/,
				params: [],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/(protected)/manager/dashboard/qualified",
				pattern: /^\/manager\/dashboard\/qualified\/?$/,
				params: [],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/(protected)/manager/dashboard/rated",
				pattern: /^\/manager\/dashboard\/rated\/?$/,
				params: [],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/(protected)/manager/startups",
				pattern: /^\/manager\/startups\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/(protected)/manager/startups/[startup]/i",
				pattern: /^\/manager\/startups\/([^/]+?)\/i\/?$/,
				params: [{"name":"startup","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,5,], errors: [1,,,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/(protected)/manager/startups/[startup]/rb",
				pattern: /^\/manager\/startups\/([^/]+?)\/rb\/?$/,
				params: [{"name":"startup","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,5,], errors: [1,,,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/(protected)/manager/startups/[startup]/rl",
				pattern: /^\/manager\/startups\/([^/]+?)\/rl\/?$/,
				params: [{"name":"startup","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,5,], errors: [1,,,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/(protected)/manager/startups/[startup]/rna",
				pattern: /^\/manager\/startups\/([^/]+?)\/rna\/?$/,
				params: [{"name":"startup","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,5,], errors: [1,,,], leaf: 22 },
				endpoint: null
			},
			{
				id: "/(protected)/manager/startups/[startup]/rns",
				pattern: /^\/manager\/startups\/([^/]+?)\/rns\/?$/,
				params: [{"name":"startup","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,5,], errors: [1,,,], leaf: 23 },
				endpoint: null
			},
			{
				id: "/(protected)/mentor",
				pattern: /^\/mentor\/?$/,
				params: [],
				page: { layouts: [0,6,], errors: [1,,], leaf: 24 },
				endpoint: null
			},
			{
				id: "/(protected)/mentor/startup/[startup]/i",
				pattern: /^\/mentor\/startup\/([^/]+?)\/i\/?$/,
				params: [{"name":"startup","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,6,7,], errors: [1,,,], leaf: 25 },
				endpoint: null
			},
			{
				id: "/(protected)/mentor/startup/[startup]/rb",
				pattern: /^\/mentor\/startup\/([^/]+?)\/rb\/?$/,
				params: [{"name":"startup","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,6,7,], errors: [1,,,], leaf: 26 },
				endpoint: null
			},
			{
				id: "/(protected)/mentor/startup/[startup]/rl",
				pattern: /^\/mentor\/startup\/([^/]+?)\/rl\/?$/,
				params: [{"name":"startup","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,6,7,], errors: [1,,,], leaf: 27 },
				endpoint: null
			},
			{
				id: "/(protected)/mentor/startup/[startup]/rna",
				pattern: /^\/mentor\/startup\/([^/]+?)\/rna\/?$/,
				params: [{"name":"startup","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,6,7,], errors: [1,,,], leaf: 28 },
				endpoint: null
			},
			{
				id: "/(protected)/mentor/startup/[startup]/rns",
				pattern: /^\/mentor\/startup\/([^/]+?)\/rns\/?$/,
				params: [{"name":"startup","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,6,7,], errors: [1,,,], leaf: 29 },
				endpoint: null
			},
			{
				id: "/(auth)/register",
				pattern: /^\/register\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/(protected)/user",
				pattern: /^\/user\/?$/,
				params: [],
				page: { layouts: [0,8,], errors: [1,,], leaf: 30 },
				endpoint: null
			},
			{
				id: "/(protected)/user/startup/[startup]/i",
				pattern: /^\/user\/startup\/([^/]+?)\/i\/?$/,
				params: [{"name":"startup","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,8,9,], errors: [1,,,], leaf: 31 },
				endpoint: null
			},
			{
				id: "/(protected)/user/startup/[startup]/rb",
				pattern: /^\/user\/startup\/([^/]+?)\/rb\/?$/,
				params: [{"name":"startup","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,8,9,], errors: [1,,,], leaf: 32 },
				endpoint: null
			},
			{
				id: "/(protected)/user/startup/[startup]/rl",
				pattern: /^\/user\/startup\/([^/]+?)\/rl\/?$/,
				params: [{"name":"startup","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,8,9,], errors: [1,,,], leaf: 33 },
				endpoint: null
			},
			{
				id: "/(protected)/user/startup/[startup]/rna",
				pattern: /^\/user\/startup\/([^/]+?)\/rna\/?$/,
				params: [{"name":"startup","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,8,9,], errors: [1,,,], leaf: 34 },
				endpoint: null
			},
			{
				id: "/(protected)/user/startup/[startup]/rns",
				pattern: /^\/user\/startup\/([^/]+?)\/rns\/?$/,
				params: [{"name":"startup","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,8,9,], errors: [1,,,], leaf: 35 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
