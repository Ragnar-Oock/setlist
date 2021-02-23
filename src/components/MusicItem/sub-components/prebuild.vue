				class="btn small dull with-icon"
				<img
					v-if="vip"
					svg-inline
					class="icon"
					src="@/assets/images/diamond-fill.svg"
					aria-hidden="true"
				>
				<img
					v-else
					svg-inline
					class="icon"
					src="@/assets/images/diamond.svg"
					aria-hidden="true"
				>
				class="btn small dull with-icon"
				<img
					v-if="edit"
					svg-inline
					class="icon"
					src="@/assets/images/edit-fill.svg"
					aria-hidden="true"
				>
				<img
					v-else
					svg-inline
					class="icon"
					src="@/assets/images/edit.svg"
					aria-hidden="true"
				>
		<div class="btn-group copy">
			<button class="btn small dull with-icon">
				<img
					svg-inline
					class="icon"
					src="@/assets/images/clipboard-plus.svg"
					aria-hidden="true"
				>
