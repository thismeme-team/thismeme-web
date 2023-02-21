import { IS_CSR } from "@/application/util";

class ChannelService {
  constructor() {
    if (IS_CSR) this.loadScript();
  }

  loadScript() {
    (function () {
      const w = window;
      if (w.ChannelIO) {
        return w.console.error("ChannelIO script included twice.");
      }
      const ch: IChannelIO = function (...args) {
        ch.c?.(...args);
      };
      ch.q = [];
      ch.c = function (args) {
        ch.q?.push(args);
      };
      w.ChannelIO = ch;
      function l() {
        if (w.ChannelIOInitialized) {
          return;
        }
        w.ChannelIOInitialized = true;
        const s = document.createElement("script");
        s.type = "text/javascript";
        s.defer = true;
        s.src = "https://cdn.channel.io/plugin/ch-plugin-web.js";
        const x = document.getElementsByTagName("script")[0];
        if (x.parentNode) {
          x.parentNode.insertBefore(s, x);
        }
      }
      if (document.readyState === "complete") {
        l();
      } else {
        w.addEventListener("DOMContentLoaded", l);
        w.addEventListener("load", l);
      }
    })();
  }

  boot(option: BootOption, callback?: Callback) {
    window.ChannelIO?.("boot", option, callback);
  }

  shutdown() {
    window.ChannelIO?.("shutdown");
  }
}

interface BootOption {
  appearance?: string;
  customLauncherSelector?: string;
  hideChannelButtonOnBoot?: boolean;
  hidePopup?: boolean;
  language?: string;
  memberHash?: string;
  memberId?: string;
  mobileMessengerMode?: string;
  pluginKey: string;
  profile?: Profile;
  trackDefaultEvent?: boolean;
  trackUtmSource?: boolean;
  unsubscribe?: boolean;
  unsubscribeEmail?: boolean;
  unsubscribeTexting?: boolean;
  zIndex?: number;
}

interface Callback {
  (error: Error | null, user: CallbackUser | null): void;
}

interface CallbackUser {
  alert: number;
  avatarUrl: string;
  id: string;
  language: string;
  memberId: string;
  name?: string;
  profile?: Profile | null;
  tags?: string[] | null;
  unsubscribeEmail: boolean;
  unsubscribeTexting: boolean;
}
interface Profile {
  [key: string]: string | number | boolean | null;
}

export const channelService = new ChannelService();
