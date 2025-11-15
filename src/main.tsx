import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {RouterProvider} from 'react-router'
import './index.css'
import router from "@/routes";
import {ThemeProvider} from "@/components/ThemeProvider.tsx";
import {Toaster} from "@/components/ui/sonner";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <RouterProvider router={router}/>
            <Toaster richColors/>
        </ThemeProvider>
    </StrictMode>,
)
