export function useModule() {
    const [module, setModule] = useState(null);

    return {
        module,
    };
}