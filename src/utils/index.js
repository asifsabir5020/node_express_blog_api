export const checkPermission = (userIdFromRequest, userIdFromEntity) => {
    return userIdFromRequest === userIdFromEntity;
}

export const isAdmin = (userRole) => {
    return userRole === 'admin';
}