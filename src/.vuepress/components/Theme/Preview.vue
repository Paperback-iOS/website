<template>
	<div class="iphone-x">
		<i id="speaker"></i>
		<b id="camera"></b>
		<div class="screen">
			<div class="status-bar">
				<p class="status-time">9:00</p>
				<svg xmlns="http://www.w3.org/2000/svg" width="54" height="14">
					<path
						d="M 38 4.5 C 38 3.119 39.119 2 40.5 2 L 51.5 2 C 52.881 2 54 3.119 54 4.5 L 54 9.5 C 54 10.881 52.881 12 51.5 12 L 40.5 12 C 39.119 12 38 10.881 38 9.5 Z"
						fill="#FFFFFF"
					></path>
					<path
						d="M 18.665 4.808 C 18.303 4.368 18.381 3.714 18.837 3.372 L 20 2.5 C 21.25 1.75 23 1 25 1 C 27 1 28.75 1.75 30 2.5 L 31.163 3.372 C 31.619 3.714 31.697 4.368 31.335 4.808 L 25.772 11.563 C 25.372 12.048 24.628 12.048 24.228 11.563 Z"
						fill="#FFFFFF"
					></path>
					<path
						d="M 10.336 1.479 C 10.981 0.906 12 1.364 12 2.227 L 12 11 C 12 11.552 11.552 12 11 12 L 1.13 12 C 0.211 12 -0.221 10.863 0.466 10.253 Z"
						fill="#FFFFFF"
					></path>
				</svg>
			</div>

			<tabs>
				<tab>
					<span slot="label">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							class="graphic"
						>
							<path
								d="M 0 0 L 24 0 L 24 24 L 0 24 Z"
								fill="transparent"
							></path>
							<path
								d="M 3 19 C 5.785 17.392 9.215 17.392 12 19 C 14.785 17.392 18.215 17.392 21 19 M 3 6 C 5.785 4.392 9.215 4.392 12 6 C 14.785 4.392 18.215 4.392 21 6 M 3 6 L 3 19 M 12 6 L 12 19 M 21 6 L 21 19"
								fill="transparent"
								stroke-width="1.5"
								stroke="#888"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-dasharray=""
							></path>
						</svg>
					</span>
					<Theme-Paperback-Discover />
				</tab>

				<tab>
					<span slot="label">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							class="graphic"
						>
							<path
								d="M 16.5 16.5 L 21 21"
								fill="transparent"
								stroke-width="2"
								stroke="#888"
								stroke-linecap="round"
							></path>
							<path
								d="M 10.5 1 C 15.747 1 20 5.253 20 10.5 C 20 15.747 15.747 20 10.5 20 C 5.253 20 1 15.747 1 10.5 C 1 5.253 5.253 1 10.5 1 Z M 3 10.5 C 3 14.642 6.358 18 10.5 18 C 14.642 18 18 14.642 18 10.5 C 18 6.358 14.642 3 10.5 3 C 6.358 3 3 6.358 3 10.5 Z"
								fill="#888"
							></path>
						</svg>
					</span>
					<Theme-Paperback-Search />
				</tab>

				<tab>
					<span slot="label">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							class="graphic"
						>
							<path
								d="M 4.8 4 C 4.8 3.558 5.158 3.2 5.6 3.2 L 18.4 3.2 C 18.842 3.2 19.2 3.558 19.2 4 L 19.2 21.6 C 19.2 21.891 19.042 22.159 18.788 22.3 C 18.533 22.441 18.223 22.433 17.976 22.278 L 12 18.544 L 6.024 22.278 C 5.777 22.433 5.467 22.441 5.212 22.3 C 4.958 22.159 4.8 21.891 4.8 21.6 Z M 6.4 4.8 L 6.4 20.157 L 11.152 17.187 C 11.671 16.863 12.329 16.863 12.848 17.187 L 17.6 20.157 L 17.6 4.8 Z"
								fill="#888"
							></path>
						</svg>
					</span>
					<Theme-Paperback-Library />
				</tab>

				<tab>
					<span slot="label">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							class="graphic"
						>
							<path
								d="M 12 1.403 C 6.148 1.403 1.403 6.148 1.403 12 C 1.403 17.852 6.148 22.597 12 22.597 C 17.852 22.597 22.597 17.852 22.597 12 C 22.597 6.148 17.852 1.403 12 1.403 Z M 2.923 12 C 2.923 6.987 6.987 2.923 12 2.923 C 17.013 2.923 21.077 6.987 21.077 12 C 21.077 17.013 17.013 21.077 12 21.077 C 6.987 21.077 2.923 17.013 2.923 12 Z M 12.8 7.2 C 12.8 6.758 12.442 6.4 12 6.4 C 11.558 6.4 11.2 6.758 11.2 7.2 L 11.2 12 C 11.2 12.212 11.284 12.416 11.434 12.566 L 14.634 15.766 C 14.946 16.079 15.454 16.079 15.766 15.766 C 16.079 15.454 16.079 14.946 15.766 14.634 L 12.8 11.669 Z"
								fill="#888"
							></path>
						</svg>
					</span>
					<Theme-Paperback-History />
				</tab>

				<tab>
					<span slot="label">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							class="graphic"
						>
							<path
								d="M 11.312 1.04 C 10.677 1.041 10.128 1.48 9.987 2.099 L 9.606 3.779 C 8.998 3.955 8.422 4.198 7.878 4.496 L 6.422 3.578 C 5.885 3.238 5.184 3.317 4.734 3.766 L 3.765 4.736 C 3.316 5.185 3.238 5.885 3.576 6.422 L 4.494 7.882 C 4.197 8.422 3.955 9.002 3.779 9.608 L 2.099 9.989 C 1.48 10.129 1.04 10.68 1.04 11.315 L 1.04 12.686 C 1.04 13.322 1.48 13.872 2.099 14.013 L 3.779 14.394 C 3.955 15 4.197 15.578 4.496 16.122 L 3.576 17.578 C 3.237 18.115 3.315 18.816 3.765 19.266 L 4.736 20.235 C 5.185 20.684 5.885 20.762 6.422 20.424 L 7.88 19.506 C 8.422 19.803 9 20.045 9.606 20.221 L 9.987 21.901 C 10.128 22.52 10.678 22.96 11.314 22.96 L 12.685 22.96 C 13.32 22.96 13.871 22.52 14.011 21.901 L 14.392 20.221 C 15 20.045 15.576 19.805 16.12 19.506 L 17.578 20.424 C 18.115 20.762 18.815 20.684 19.264 20.235 L 20.234 19.266 C 20.683 18.816 20.761 18.116 20.422 17.579 L 19.504 16.122 C 19.803 15.578 20.045 15.002 20.221 14.394 L 21.901 14.013 C 22.52 13.872 22.96 13.322 22.96 12.686 L 22.96 11.315 C 22.961 10.679 22.521 10.128 21.901 9.987 L 20.221 9.608 C 20.045 9 19.805 8.424 19.506 7.88 L 20.424 6.424 C 20.763 5.886 20.685 5.185 20.235 4.736 L 19.266 3.766 C 18.816 3.317 18.115 3.238 17.578 3.578 L 16.122 4.496 C 15.574 4.194 14.994 3.954 14.394 3.779 L 14.011 2.099 C 13.871 1.48 13.32 1.04 12.685 1.04 L 11.314 1.04 Z M 7.872 6.101 C 8.73 5.498 9.711 5.091 10.744 4.909 L 11.314 2.4 L 12.685 2.4 L 13.254 4.909 C 14.287 5.091 15.268 5.497 16.126 6.099 L 18.302 4.728 L 19.274 5.698 L 17.901 7.874 C 18.493 8.717 18.906 9.691 19.091 10.746 L 21.6 11.315 L 21.6 12.686 L 19.091 13.254 C 18.91 14.288 18.503 15.269 17.901 16.128 L 19.272 18.304 L 18.302 19.274 L 16.126 17.902 C 15.268 18.504 14.287 18.91 13.254 19.091 L 12.685 21.6 L 11.314 21.6 L 10.744 19.091 C 9.712 18.909 8.732 18.503 7.874 17.901 L 5.698 19.274 L 4.726 18.304 L 6.099 16.128 C 5.497 15.269 5.09 14.288 4.909 13.254 L 2.4 12.688 L 2.4 11.317 L 4.909 10.747 C 5.091 9.715 5.497 8.735 6.099 7.877 L 4.726 5.696 L 5.696 4.726 L 7.872 6.099 Z M 14.442 12 C 14.442 13.348 13.349 14.44 12.002 14.44 C 10.654 14.44 9.562 13.348 9.562 12 C 9.562 10.652 10.654 9.56 12.002 9.56 C 13.349 9.56 14.442 10.652 14.442 12 Z M 15.882 12 C 15.882 14.143 14.144 15.88 12.002 15.88 C 9.859 15.88 8.122 14.143 8.122 12 C 8.122 9.857 9.859 8.12 12.002 8.12 C 14.144 8.12 15.882 9.857 15.882 12 Z"
								fill="#888"
							></path>
						</svg>
					</span>
					<Theme-Paperback-Settings />
				</tab>
			</tabs>
		</div>
	</div>
</template>

<script>
import Tab from "./Tab.vue";
import Tabs from "./Tabs.vue";

export default {
	components: {
		Tab,
		Tabs,
	},
};
</script>

<style scoped>
.iphone-x {
	/* position: relative; */
	margin: 40px auto;
	width: 319.6px;
	height: 664.4px;
	border-radius: 40px;
	box-shadow: 0px 0px 0px 11px #1f1f1f, 0px 0px 0px 13px #191919,
		0px 0px 0px 20px #111;
}

.iphone-x:before,
.iphone-x:after {
	content: "";
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
}

.iphone-x:after {
	z-index: 5;
	bottom: 7px;
	width: 140px;
	height: 4px;
	background-color: #f2f2f2;
	border-radius: 10px;
}

.iphone-x:before {
	z-index: 1;
	top: 0px;
	width: 56%;
	height: 30px;
	background-color: #1f1f1f;
	border-radius: 0px 0px 40px 40px;
}

.iphone-x i,
.iphone-x b {
	z-index: 5;
	position: absolute;
	display: block;
	color: transparent;
}

.iphone-x i {
	top: 0px;
	left: 50%;
	transform: translate(-50%, 6px);
	height: 8px;
	width: 15%;
	background-color: #101010;
	border-radius: 8px;
	box-shadow: inset 0px -3px 3px 0px rgba(255, 255, 255, 0.2);
}

.iphone-x b {
	left: 14%;
	top: 0px;
	transform: translate(180px, 4px);
	width: 12px;
	height: 12px;
	background-color: #101010;
	border-radius: 12px;
	box-shadow: inset 0px -3px 2px 0px rgba(255, 255, 255, 0.2);
}

.iphone-x b:after {
	content: "";
	position: absolute;
	background-color: #2d4d76;
	width: 6px;
	height: 6px;
	top: 2px;
	left: 2px;
	top: 3px;
	left: 3px;
	display: block;
	border-radius: 4px;
	box-shadow: inset 0px -2px 2px rgba(0, 0, 0, 0.5);
}

.screen {
	border-radius: 40px;
	width: 100%;
	height: 100%;
	background-color: #111111;
	overflow: hidden;
	position: relative;
}

.graphic {
	flex-shrink: 0;
	width: 24px;
	height: 24px;
	cursor: pointer;
}

.status-bar {
	box-sizing: border-box;
	width: 325px;
	height: 44px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 0px 24px 0px 24px;
	overflow: visible;
}

.status-time {
	flex-shrink: 0;
	width: auto;
	height: auto;
	white-space: pre;
	overflow: visible;
	font-weight: 600;
	font-style: normal;
	font-family: "Inter", sans-serif;
	color: #ffffff;
	font-size: 15px;
	letter-spacing: 0px;
	line-height: 1.2;
	text-align: left;
}
</style>
