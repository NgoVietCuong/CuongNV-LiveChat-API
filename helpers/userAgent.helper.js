function getBrowser(ua) {
  return ua.browser;
}

function getDevice(ua) {
  let device = 'Unknown';
  if (ua.isMobile) {
    device = 'Mobile';
  } else if (ua.isTablet) {
    device = 'Tablet';
  } else if (ua.isDesktop) {
    device = 'Desktop';
  }
  return device;
}

function getOS(ua) {
  let os = 'Unknown';
  if (ua.isWindows) {
    os = 'Windows';
  } else if (ua.isLinux) {
    os = 'Linux';
  } else if (ua.isAndroid) {
    os = 'Android';
  } else if (ua.isMac) {
    if (ua.isiPhone) {
      os = 'iOS';
    } else if (ua.isiPad) {
      os = 'ipadOS';
    } else {
      os = 'macOS';
    }
  }
  return os;
}

module.exports = {
  getBrowser,
  getDevice,
  getOS
}