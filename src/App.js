import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import '@vkontakte/vkui/dist/vkui.css';

import Map from "./Map"

function App() {
	return (
		<div>
			<Map />
		</div>
	);
}


export default App;

