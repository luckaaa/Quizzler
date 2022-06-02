import Quiz from './components/Quiz'
import {createContext, useState} from 'react'
import './App.css'
import ReactSwitch from 'react-switch'
import {motion} from 'framer-motion'


export const ThemeContext = createContext(null)


function App() {
	const [theme, setTheme] = useState('dark')
	
	const toggleTheme =()=>{
		setTheme((curr) =>(curr=== "light" ? "dark" : "light"))
	}
	
	return(
	<ThemeContext.Provider value = {{theme, toggleTheme}}>
	<div className = "App" id ={theme}>
		<Quiz />
		<motion.div initial={{x: '300vw'}} 
                            animate={{x: 0}}
                            transition={{type: 'spring', duration: 2, bounce: 0.3}} 
							className ="toggle" ><ReactSwitch onChange={toggleTheme} checked={theme === "dark"} 
		offHandleColor = {'#051367'} onHandleColor = {'#b1f4cf'} width={25} height={26} /></motion.div>
	</div>
	</ ThemeContext.Provider>)
}

export default App;