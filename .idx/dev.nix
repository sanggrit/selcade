# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.11"; # or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_22
  ];
  # Sets environment variables in the workspace
  env = {};
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      # "vscodevim.vim"
      "google.gemini-cli-vscode-ide-companion"
    ];
    # Enable previews and customize configuration
    previews = {
      enable = true;
      previews = {
        web = {
          # Vite dev server — serves the React app with HMR on the IDX preview port.
          # Previously used python3 -m http.server which served the bare project root
          # (old index.html + empty main.js) instead of the built React app.
          command = ["sh" "-c" "npm run dev -- --port $PORT --host 0.0.0.0"];
          manager = "web";
        };
      };
    };
    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        npm-install = "npm install";
        default.openFiles = [ "src/App.jsx" "index.html" ];
      };
      # Runs when the workspace is (re)started
      onStart = {
        npm-install = "npm install";
      };
    };
  };
}
