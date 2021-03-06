<template>
	<div class="header">
		<ul class="dropdown-list">
			<li title="About" class="list-item" @mouseenter="mouseEnter" @mouseleave="mouseLeave" @click="mouseEnter">
				About
			</li>
			<li title="Themes" class="list-item" @mouseenter="mouseEnter" @mouseleave="mouseLeave" @click="mouseEnter">
				Themes
			</li>
			<li title="LinkedIn" class="list-item list-item--hide-sm">
				<a href="https://www.linkedin.com/in/jackdavidevans" target="_blank">LinkedIn</a>
			</li>
		</ul>
		<Dropdown
			v-show="dropdown['about'] === 1"
			v-click-outside="closeDropdown"
			title="About"
			:style="{ left: leftXOption + 'px' }"
			:options="[
				{ title: 'View CV', link: 'https://view.publitas.com/p222-14439/jack-david-evans--cv/page/1' },
				{ title: 'LinkedIn', link: 'https://www.linkedin.com/in/jackdavidevans' },
				{ title: 'Instagram', link: 'https://instagram.com/jackdavidevans' },
				{ title: 'Twitter', link: 'https://twitter.com/jackdavidevans' },
				{ title: 'Github', link: 'https://github.com/eagleeyejack' },
				{ title: 'Codepen', link: 'https://codepen.io/eagleeyejack' },
				{ title: 'Book shelf', link: 'https://books.jackdavidevans.co.uk' }
			]"
			@mouseover.native="open('about')"
			@mouseleave.native="close('about')"
		/>
		<Dropdown
			v-show="dropdown['themes'] === 1"
			v-click-outside="closeDropdown"
			title="Themes"
			:style="{ left: leftXOption + 'px' }"
			:options="[
				{ title: 'Green', passedFunc: colorChange },
				{ title: 'Pink', passedFunc: colorChange },
				{ title: 'Yellow', passedFunc: colorChange },
				{ title: 'Blue', passedFunc: colorChange }
			]"
			@mouseover.native="open('themes')"
			@mouseleave.native="close('themes')"
		/>
		<Window title="System" :index="2" :visible="windows.system" :close="closeWindow">
			<System />
		</Window>

		<div class="datesWrap">
			<div class="time">{{ time }}</div>
			<div class="date">{{ date }}</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue"
import dayjs from "dayjs"

// @ts-ignore
import ClickOutside from "vue-click-outside"
import Dropdown from "../components/Dropdown.vue"
import System from "../components/System.vue"

export default Vue.extend({
	components: {
		Dropdown,
		System
	},
	directives: {
		ClickOutside
	},
	data() {
		return {
			time: dayjs().format("hh:mm:ss A"),
			date: dayjs().format("ddd MMM DD YYYY"),
			hover: false,
			leftXOption: 0,
			dropdown: {
				file: 0,
				about: 0,
				themes: 0
			},
			windows: {
				system: 0
			},
			clickCount: 0
		}
	},
	mounted() {
		this.getTime()
	},
	methods: {
		open(name: string) {
			Vue.set(this.dropdown, name, 1)
		},
		close(name: string) {
			Vue.set(this.dropdown, name, 0)
		},
		openWindow(name: string) {
			Vue.set(this.windows, name, 1)
		},
		closeWindow(name: string) {
			Vue.set(this.windows, name, 0)
		},
		mouseEnter(e: any) {
			this.dropdown = {
				file: 0,
				about: 0,
				themes: 0,
				[`${e.target.getAttribute("title").toLowerCase()}`]: 1
			}
			this.leftXOption = e.target.offsetLeft
		},
		mouseLeave() {
			this.dropdown = {
				file: 0,
				about: 0,
				themes: 0
			}
		},
		closeDropdown(e: any) {
			e.stopPropagation()

			if (e.target.classList.contains("desktop") && e.type === "touchstart") {
				this.dropdown = {
					file: 0,
					about: 0,
					themes: 0
				}
			}
		},
		setTime() {
			this.time = dayjs().format("hh:mm:ss A")
			this.date = dayjs().format("ddd MMM DD YYYY")
		},
		getTime() {
			setInterval(this.setTime, 1000)
		},
		colorChange(e: any) {
			const colors: any = {
				green: "#b5ecda",
				pink: "rgb(255, 201, 201)",
				yellow: "#fff6d9",
				blue: "#859ee2"
			}

			// eslint-disable-next-line dot-notation
			document.body.style.backgroundColor = colors[e]
			if (process.browser) {
				localStorage.setItem("theme", JSON.stringify(colors[e]))
			}
		}
	}
})
</script>

<style lang="scss">
.header {
	display: flex;
	background: var(--color-grey);
	height: 26px;
	border-bottom: 2px solid var(--color-black);
	padding: 0;
	font-size: 16px;
	justify-content: space-between;
	font-family: var(--font-grotesk-bold);

	@media (min-width: 615px) {
		padding: 0 1rem;
	}
}

.dropdown-list {
	list-style: none;
	display: flex;
	justify-content: center;
	align-items: center;

	.list-item {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 var(--space-tiny);
		cursor: pointer;

		a {
			text-decoration: none;
			color: var(--color-black);
			height: 100%;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		&:hover {
			color: var(--color-white);
			background: var(--color-blue-dark);

			a {
				color: var(--color-white);
				background: var(--color-blue-dark);
			}
		}

		&--hide-sm {
			display: none;

			@media (min-width: 615px) {
				display: flex;
			}
		}
	}
}

.datesWrap {
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: default;

	.time {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		padding: var(--space-tiny);
		border-left: 2px solid var(--color-black);
	}

	.date {
		display: none;
		justify-content: center;
		align-items: center;
		height: 100%;
		padding: var(--space-tiny);
		border-left: 2px solid var(--color-black);

		@media (min-width: 465px) {
			display: flex;
		}
	}
}
</style>
