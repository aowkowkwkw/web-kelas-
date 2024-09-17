import React, { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

const Senin = React.lazy(() => import("../components/Mapel/Senin"))
const Selasa = React.lazy(() => import("../components/Mapel/Selasa"))
const Rabu = React.lazy(() => import("../components/Mapel/Rabu"))
const Kamis = React.lazy(() => import("../components/Mapel/Kamis"))
const Jumat = React.lazy(() => import("../components/Mapel/Jumat"))

const Schedule = () => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const currentDayIndex = new Date().getDay()
    const currentDay = daysOfWeek[currentDayIndex]
    const tomorrowDayIndex = (currentDayIndex + 1) % 7
    const tomorrowDay = daysOfWeek[tomorrowDayIndex]

    useEffect(() => {
        AOS.init()
        AOS.refresh()
    }, [])

    const piketGroup = [
        ["Candra", "Teguh", "Fahrul", "M.Rafly", "Andriansyah"],  
        ["Yusa", "M.Wisnu", "M.Fajar", "Febrian", "Farid", "Fadzli"],  
        ["Fahri", "Pasha", "Tegar", "Muklish", "Satria", "Alvaro"],  
        ["Azka", "Dzaki", "Albian", "Dimas", "Rizky"],  
        ["Nur Fahmi", "Silmi", "Ikhsan", "Sendi", "Nabil"]  
    ]

    const dayComponents = [
        null, // Kosongkan indeks 0
        Senin,
        Selasa,
        Rabu,
        Kamis,
        Jumat,
    ]

    // Fungsi untuk mendapatkan komponen dan nama piket berdasarkan indeks hari
    const getDayInfo = (dayIndex) => {
        const TodayComponent = dayComponents[dayIndex]
        const currentPiketNames = piketGroup[(dayIndex - 1 + 5) % 5] // Memastikan indeks piket selalu valid
        return { TodayComponent, currentPiketNames }
    }

    const todayInfo = getDayInfo(currentDayIndex)
    const tomorrowInfo = getDayInfo(tomorrowDayIndex)

    const renderDaySchedule = (day, { TodayComponent, currentPiketNames }) => (
        <div className="lg:flex lg:justify-center lg:gap-32 lg:mb-10 lg:mt-16">
            <div className="text-white flex flex-col justify-center items-center mt-8 md:mt-3 overflow-y-hidden">
                <div className="text-2xl font-medium mb-5" data-aos="fade-up" data-aos-duration="500">
                    {day}
                </div>
                <div data-aos="fade-up" data-aos-duration="400">
                    {TodayComponent ? (
                        <React.Suspense fallback={<p>Loading...</p>}>
                            <TodayComponent />
                        </React.Suspense>
                    ) : (
                        <p className="opacity-50">Tidak Ada Jadwal Hari Ini</p>
                    )}
                </div>
            </div>
            <div className="text-white flex flex-col justify-center items-center mt-8 lg:mt-0 lg:mb-[10rem] mb-10 overflow-y-hidden">
                <div
                    className="text-2xl font-medium mb-5 text-center"
                    data-aos="fade-up"
                    data-aos-duration="500">
                    Piket
                </div>
                {currentPiketNames && currentPiketNames.length > 0 ? (
                    currentPiketNames.map((piketName, index) => (
                        <div
                            key={index}
                            className={`border-t-2 border-white flex justify-center py-[0.50rem] w-72 px-3 ${
                                index === currentPiketNames.length - 1 ? "border-b-2" : ""
                            }`}
                            data-aos="fade-up"
                            data-aos-duration={600 + index * 100}>
                            <div className="text-base font-medium">{piketName}</div>
                        </div>
                    ))
                ) : (
                    <p className="opacity-50">Tidak Ada Jadwal Piket Hari Ini</p>
                )}
            </div>
        </div>
    )

    return (
        <>
            {renderDaySchedule("Hari Ini - " + currentDay, todayInfo)}
            {renderDaySchedule("Besok - " + tomorrowDay, tomorrowInfo)}
        </>
    )
}

export default Schedule