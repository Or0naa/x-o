import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Welcome from './pages/Welcome'
import { useGameStore } from "./store";
import Menu from './pages/Menu';
import ChooseIfYouX from './pages/ChooseIfYouX';
import Join from './pages/Join';
import Settings from './pages/Settings';
import Waiting from './pages/Waiting';
import Game from './pages/Game';
import Winning from './pages/Winning';
export default function App() {
  const router = createBrowserRouter([
    { path: '/', element: <Welcome /> },
    { path: '/menu', element: <Menu /> },
    { path: '/joinToGame', element: <Join /> },
    { path: '/choosePlayer', element: <ChooseIfYouX /> },
    { path: '/settings', element: <Settings /> },
    { path: '/waiting', element: <Waiting /> },
    { path: '/game', element: <Game /> },
    { path: '/win', element: <Winning /> }
  ])

  const handlePlayersUpdate = useGameStore(state => state.handlePlayersUpdate);
  const socketBoardUpdate = useGameStore(state => state.socketBoardUpdate);

  useEffect(() => {
    handlePlayersUpdate();
    socketBoardUpdate();
  }, [handlePlayersUpdate, socketBoardUpdate]);

  return (
    <RouterProvider router={router} />
  )
}