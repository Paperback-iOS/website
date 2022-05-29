<template>
	<div id="settings-page">
		<div class="title">Settings</div>

		<div class="foreground" style="margin: 20px 0px">
			<div class="text body-text">example@email.com</div>
			<div class="text destructive-text">Logout</div>
		</div>

		<div style="font-size: 12px; margin-left: 10px; margin-bottom: 5px">
			SETTINGS
		</div>
		<div class="foreground">
			<div class="text text-with-switch">
				<span>Incognito Mode</span>
				<span class="toggleWrapper">
					<input
						type="checkbox"
						name="toggle2"
						class="mobileToggle"
						id="toggle2"
					/>
					<label for="toggle2"></label>
				</span>
			</div>
			<div class="text text-with-switch">
				<span>Error Popups</span>
				<span class="toggleWrapper">
					<input
						type="checkbox"
						name="toggle1"
						class="mobileToggle"
						id="toggle1"
						checked
					/>
					<label for="toggle1"></label>
				</span>
			</div>
			<div class="text">General Settings</div>
			<div class="text">Theme Settings</div>
			<div class="text">External Sources</div>
			<div class="text">External Trackers</div>
			<div class="text">Experimental Featuers</div>
			<div class="text">Notification Settings</div>
			<div class="text">Backups</div>
			<div class="text destructive-text">Clear image cache</div>
			<div class="text destructive-text">Clear All Search History</div>
			<div class="text destructive-text">Attempt Database Repair</div>
		</div>
	</div>
</template>

<style scoped>
#settings-page {
	padding: 1rem;
}

.title {
	font-size: 24px;
	font-weight: bold;
	color: var(--paperback-title-text-color);
}

.text {
	margin: auto;
	padding: 7px 0.5rem;
	border-bottom: var(--paperback-separator-color) solid 1px;
	color: var(--paperback-title-text-color);
}

.body-text {
	margin: auto;
	color: var(--paperback-body-text-color);
}

.destructive-text {
	color: #f64439;
}

.foreground {
	background: var(--paperback-foreground-color);
	border-radius: 8px;
}

.foreground .text:nth-last-child(1) {
	border-bottom: none;
}

.text-with-switch {
	padding: 0rem 0.5rem;
	display: flex;
	justify-content: space-between;
}

.toggleWrapper {
	margin-top: 3px;
}

.toggleWrapper input.mobileToggle {
	opacity: 0;
	position: absolute;
}

.toggleWrapper input.mobileToggle + label {
	cursor: pointer;
	background: white;
	position: relative;
	display: inline-block;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	transition: 0.4s ease;
	height: 20px;
	width: 35px;
	border: 1px solid #e4e4e4;
	border-radius: 60px;
}
.toggleWrapper input.mobileToggle + label:before {
	content: "";
	position: absolute;
	/* display: block; */
	transition: 0.2s cubic-bezier(0.24, 0, 0.5, 1);
	height: 20px;
	width: 36px;
	top: 0;
	left: 0;
	border-radius: 30px;
}
.toggleWrapper input.mobileToggle + label:after {
	content: "";
	position: absolute;
	display: block;
	box-shadow: 0 0 0 1px hsla(0, 0%, 0%, 0.1),
		0 4px 0px 0 hsla(0, 0%, 0%, 0.04), 0 4px 9px hsla(0, 0%, 0%, 0.13),
		0 3px 3px hsla(0, 0%, 0%, 0.05);
	transition: 0.35s cubic-bezier(0.54, 1.6, 0.5, 1);
	background: whitesmoke;
	height: 20px;
	width: 20px;
	top: 0px;
	left: 0px;
	border-radius: 60px;
}
.toggleWrapper input.mobileToggle:checked + label:before {
	background: #2ecc71;
	transition: width 0.2s cubic-bezier(0, 0, 0, 0.1);
}
.toggleWrapper input.mobileToggle:checked + label:after {
	left: 15px;
}
</style>
