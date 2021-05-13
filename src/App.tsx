import { useEffect, useState } from 'react';
import { SideBar } from './components/SideBar';
import { Content } from './components/Content';
import { api } from './services/api';
import './styles/global.scss';
import { GenreContextProvider } from './contexts/GenreContext';


export function App() {

  return (
    <GenreContextProvider>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBar />
        <Content />
      </div>
    </GenreContextProvider>
  )
}