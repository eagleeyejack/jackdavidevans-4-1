export default {
	methods: {
		dragElement(elmnt: any) {
			let pos1 = 0
			let pos2 = 0
			let pos3 = 0
			let pos4 = 0

			elmnt.onmousedown = dragMouseDown

			function dragMouseDown(e: any) {
				e = e || window.event
				e.preventDefault()

				pos3 = e.clientX
				pos4 = e.clientY
				document.onmouseup = closeDragElement

				document.onmousemove = elementDrag
			}

			function elementDrag(e: any) {
				e = e || window.event
				e.preventDefault()

				pos1 = pos3 - e.clientX
				pos2 = pos4 - e.clientY
				pos3 = e.clientX
				pos4 = e.clientY

				elmnt.style.top = elmnt.offsetTop - pos2 + "px"
				elmnt.style.left = elmnt.offsetLeft - pos1 + "px"
				elmnt.style.zIndex = 5
			}

			function closeDragElement() {
				document.onmouseup = null
				document.onmousemove = null
				elmnt.style.zIndex = 4
			}
		}
	}
}