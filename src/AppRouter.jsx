import { Routes, Route } from 'react-router-dom'

function AppRouter() {
    return (
        <Routes>
            <Route path="/Dashboard" element={<div>Tab Dashboard Content</div>} />
            <Route path="/Banking" element={<div>Tab Banking Content</div>} />
            <Route path="/Telefonie" element={<div>Tab Telefonie Content</div>} />
            <Route path="/Accounting" element={<div>Tab Accounting Content</div>} />
            <Route path="/Verkauf" element={<div>Tab Verkauf Content</div>} />
            <Route path="/Statistik" element={<div>Tab Statistik Content</div>} />
            <Route path="/PostOffice" element={<div>Tab Post Office Content</div>} />
            <Route path="/Administration" element={<div>Tab Administration Content</div>} />
            <Route path="/Help" element={<div>Tab Help Content</div>} />
            <Route path="/Warenbestand" element={<div>Tab Warenbestand Content</div>} />
            <Route path="/Auswahllisten" element={<div>Tab Auswahllisten Content</div>} />
        </Routes>
    )
}

export default AppRouter
