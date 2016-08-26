'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Travel documents Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/travel-documents',
      permissions: '*'
    }, {
      resources: '/api/travel-documents/:travelDocumentId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/travel-documents',
      permissions: ['get', 'post']
    }, {
      resources: '/api/travel-documents/:travelDocumentId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/travel-documents',
      permissions: ['get']
    }, {
      resources: '/api/travel-documents/:travelDocumentId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Travel documents Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Travel document is being processed and the current user created it then allow any manipulation
  if (req.travelDocument && req.user && req.travelDocument.user && req.travelDocument.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
