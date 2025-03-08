'use client';

//Package System

//Package App

export default function Navigation({ title }: { title: string }) {
 
    return (
        <div className="flex items-center justify-center p-10 relative">
            <h1 className="text-3xl font-semibold">{title}</h1>
        </div>
    );
}
