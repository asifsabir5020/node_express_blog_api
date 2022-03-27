export const checkPermission = (userIdFromRequest, userIdFromEntity) => {
    return userIdFromRequest.toString() === userIdFromEntity.toString();
}

export const isAdmin = (userRole) => {
    return userRole === 'admin';
}