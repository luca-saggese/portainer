function ContainerViewModel(data) {
  this.Id = data.Id;
  this.Status = data.Status;
  this.State = data.State;
  this.Names = data.Names;
  this.SizeRootFs = formatSize(data.SizeRootFs);
  this.SizeRw = formatSize(data.SizeRw);
  // Unavailable in Docker < 1.10
  if (data.NetworkSettings && !_.isEmpty(data.NetworkSettings.Networks)) {
    this.IP = data.NetworkSettings.Networks[Object.keys(data.NetworkSettings.Networks)[0]].IPAddress;
  }
  this.Image = data.Image;
  this.Command = data.Command;
  this.Checked = false;
  this.Ports = [];
  for (var i = 0; i < data.Ports.length; ++i) {
    var p = data.Ports[i];
    if (p.PublicPort) {
      this.Ports.push({ host: p.IP, private: p.PrivatePort, public: p.PublicPort });
    }
  }

  function formatSize(bytes, precision) {
		if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
		if (typeof precision === 'undefined') precision = 1;
		var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
			number = Math.floor(Math.log(bytes) / Math.log(1024));
		return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) +  ' ' + units[number];
	}
}
