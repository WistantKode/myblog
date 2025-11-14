export const passwordRules = [
    {test: (val: string) => val.length <= 50, label: "Max 50 characters"},
    {test: (val: string) => /[A-Z]/.test(val), label: "At least one uppercase"},
    {test: (val: string) => /[0-9]/.test(val), label: "At least one number"},
    {test: (val: string) => val.length >= 8, label: "At least 8 characters"},
]