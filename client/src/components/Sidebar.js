import React from "react";
import { NavLink } from "react-router-dom";
import './Sidebar.css';

function Sidebar() {
     return (
          <div className="sidebar d-flex p-3">
               <NavLink className={({ isActive }) => (isActive ? 'sb-active sb-link text-dark ps-3' : 'sb-link text-dark ps-3')} to="/products/all">View All Products</NavLink>
               <NavLink className={({ isActive }) => (isActive ? 'sb-active sb-link text-dark ps-3' : 'sb-link text-dark ps-3')} to="/products/art">Art</NavLink>
               <NavLink className={({ isActive }) => (isActive ? 'sb-active sb-link text-dark ps-3' : 'sb-link text-dark ps-3')} to="/products/clothing">Clothing & Accessories</NavLink>
               <NavLink className={({ isActive }) => (isActive ? 'sb-active sb-link text-dark ps-3' : 'sb-link text-dark ps-3')} to="/products/homewares">Homewares</NavLink>
               <NavLink className={({ isActive }) => (isActive ? 'sb-active sb-link text-dark ps-3' : 'sb-link text-dark ps-3')} to="/products/jewellry">Jewellry</NavLink>
          </div>
     );
}
export default Sidebar;