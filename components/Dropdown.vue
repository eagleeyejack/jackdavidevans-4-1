<template>
	<ul class="dropdown-menu">
		<li v-for="option in options" :key="option.title">
			<a v-if="option.link" :href="option.link" target="_blank">{{ `${option.title}` }}</a>
			<button v-else @click="option.passedFunc(option.title.toLowerCase())">{{ `${option.title}` }}</button>
		</li>
	</ul>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
	props: {
		title: {
			type: String,
			required: true
		},
		options: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			showFile: false,
			localVisible: 0
		}
	}
})
</script>

<style scoped lang="scss">
.dropdown-menu {
	position: absolute;
	background: var(--color-grey);
	width: 250px;
	top: 24px;
	border: 2px solid var(--color-black);
	z-index: 999;
	cursor: pointer;

	&:hover {
		display: block;
	}

	li {
		cursor: pointer;
		height: 36px;
		display: flex;

		button,
		a {
			border: 0;
			height: 100%;
			width: 100%;
			padding: 0;
			text-align: left;
			font-size: 16px;
			font-family: var(--font-grotesk-bold);
			background: transparent;
			cursor: pointer;
			padding: var(--space-tiny);

			&:focus {
				outline: none;
				box-shadow: none;
			}
		}

		&:hover {
			background: var(--color-black);
			color: var(--color-white);
			a,
			button {
				color: var(--color-white);
			}
		}

		a {
			text-decoration: none;
			color: var(--color-black);
			padding: var(--space-tiny);
		}
	}
}
</style>
