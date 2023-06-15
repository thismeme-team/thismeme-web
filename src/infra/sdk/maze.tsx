import Script from "next/script";

export const MazeScript = () => {
  return (
    <Script id="maze-script">
      {`
        (function (m, a, z, e) {
        let s, t;
        try {
            t = m.sessionStorage.getItem("maze-us");
        } catch (err) {}

        if (!t) {
            t = new Date().getTime();
            try {
            m.sessionStorage.setItem("maze-us", t);
            } catch (err) {}
        }

        s = a.createElement("script");
        s.src = z + "?t=" + t + "&apiKey=" + e;
        s.async = true;
        a.getElementsByTagName("head")[0].appendChild(s);
        m.mazeUniversalSnippetApiKey = e;
        })(
        window,
        document,
        "https://snippet.maze.co/maze-universal-loader.js",
        "f1f44468-c9d9-4f3f-9130-222b2ddc3d2f",
        );
      `}
    </Script>
  );
};
