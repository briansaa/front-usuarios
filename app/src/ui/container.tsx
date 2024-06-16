const Container = ({ children }: Readonly<{ children?: React.ReactNode }>) => {
    return (
        <div className="min-h-[calc(100vh-8rem)] flex flex-col justify-start items-center py-4 gap-y-4">
            {children}
        </div>
    )
}

export { Container }