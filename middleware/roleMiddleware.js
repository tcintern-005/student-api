const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    console.log("RBAC CHECK:", req.user);

    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      console.log("RBAC DENIED:", req.user.role);

      return res.status(403).json({
        message: "Access denied. You do not have permission.",
      });
    }

    console.log("RBAC ALLOWED:", req.user.role);

    next();
  };
};

module.exports = requireRole;