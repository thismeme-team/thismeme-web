import { useEffect } from "react";

import { ChannelService } from "@/common/libs";
import type { User } from "@/types";

interface Props {
  user?: User;
}

const MAX_LOAD_DELAY = 1000;
export const useChannelIO = ({ user }: Props) => {
  useEffect(() => {
    const channelService = ChannelService.getInstance();

    const timeout = setTimeout(
      () => {
        if (user) {
          const { name, email } = user;
          channelService.boot({
            pluginKey: process.env.NEXT_PUBLIC_CHANNEL_IO_KEY,
            memberId: email,
            profile: {
              name,
              email,
            },
          });
        } else {
          channelService.boot({
            pluginKey: process.env.NEXT_PUBLIC_CHANNEL_IO_KEY,
          });
        }
      },
      channelService.isLoaded() ? 0 : MAX_LOAD_DELAY,
    );

    return () => {
      channelService.shutdown();
      clearTimeout(timeout);
    };
  }, [user]);
};
