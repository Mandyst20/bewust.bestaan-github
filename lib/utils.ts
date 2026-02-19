// Utility functions

/**
 * Get the initials from a full name.
 * @param fullName - The full name string, e.g. "John Doe"
 * @returns The initials, e.g. "JD"
 */
function getInitials(fullName: string): string {
    const names = fullName.trim().split(' ');
    const initials = names.map(name => name.charAt(0).toUpperCase()).join('');
    return initials;
}

// Exporting the function for use in other modules
export { getInitials };