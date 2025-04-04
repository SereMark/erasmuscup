import React from "react"
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="pt-[72px] flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}