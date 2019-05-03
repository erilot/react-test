import * as _ from "lodash";
import semanticSort from "./SemanticSort";

function groupReleases(releases) {
  const out = {};
  releases = semanticSort(releases);

  out["all"] = releases;
  out["supported"] = _.filter(releases, r => {
    return r.supportState.isSupported === true;
  });
  out["unsupported"] = _.filter(releases, r => {
    return (
      r.supportState.isSupported === false &&
      r.supportState.isArchived === false &&
      r.supportState.isPreRelease === false
    );
  });
  out["beta"] = _.filter(releases, r => {
    return r.supportState.isPreRelease === true;
  });
  out["current"] = out.supported.length
    ? _.head(out.supported)
    : _.head(out.beta);
  out["eol"] = _.filter(releases, r => {
    return r.supportState.isArchived === true;
  });
  // console.log('out:',out);

  return out;
}

export default groupReleases;
