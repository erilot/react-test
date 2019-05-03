function sortReleases(releases){
   
    return releases.sort((a, b) => {
      // this is an ugly sort implementation, but does get the job done.
      let aSplit = a.number.split('.');
      let bSplit = b.number.split('.');

      // major version
      if (parseInt(aSplit[0]) > parseInt(bSplit[0])) {
          return 1;
      }
      if (parseInt(aSplit[0]) < parseInt(bSplit[0])) {
          return -1;
      }

      // minor version
      if (parseInt(aSplit[1]) > parseInt(bSplit[1])) {
          return 1;
      }
      if (parseInt(aSplit[1]) < parseInt(bSplit[1])) {
          return -1;
      }

      // Maintenance version
      if (parseInt(aSplit[2]) > parseInt(bSplit[2])) {
          return 1;
      }
      if (parseInt(aSplit[2]) < parseInt(bSplit[2])) {
          return -1;
      }

      // It's all the same, abandon hope, WHY DID WE EVEN BOTHER
      return 0;
    }).reverse();
  }

  export default sortReleases;