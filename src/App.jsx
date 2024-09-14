import React, { useEffect } from "react"
import Home from "./Pages/Home"
import Carousel from "./Pages/Gallery"
import FullWidthTabs from "./Pages/Tabs"
import Footer from "./Pages/Footer"
import Chat from "./components/ChatAnonim"
import AOS from "aos"
import "aos/dist/aos.css"
import Swal from 'sweetalert2'

function App() {
	useEffect(() => {
		AOS.init()
		AOS.refresh()

		// Fungsi untuk memainkan musik
		function play() {
			var audio = new Audio('15.m4a');
			audio.play();
			audio.loop = true;
		}

		// Konfigurasi SweetAlert
		const swals = Swal.mixin({ confirmButtonColor: '#8B00B4' });

		// Fungsi untuk memulai aplikasi
		async function start() {
			await swals.fire('Selamat Datang!');
			play();
		}

		// Panggil fungsi start
		start();

		// Cleanup function
		return () => {
			// Hentikan audio jika komponen unmount
			const audio = document.querySelector('audio');
			if (audio) audio.pause();
		};
	}, [])

	return (
		<>
			<Home />
			<Carousel />
			<FullWidthTabs />
			<div id="Mesh1"></div>
			<div
				className="lg:mx-[12%] lg:mt-[-5rem] lg:mb-20 hidden lg:block"
				id="ChatAnonim_lg"
				data-aos="fade-up"
				data-aos-duration="1200">
				<Chat />
			</div>
			<Footer />
		</>
	)
}

export default App