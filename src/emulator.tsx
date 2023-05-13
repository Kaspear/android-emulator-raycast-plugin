import { Action, ActionPanel, List } from "@raycast/api";
import { useEffect, useState } from "react";
import { exec } from "child_process";

const EMULATOR_LINK = "~/Library/Android/sdk/emulator/emulator";

export default function Emulator() {
  const [availableAvds, setAvailableAvds] = useState<string[]>([]);

  useEffect(() => {
    // Get list of available avds
    exec(`${EMULATOR_LINK} -list-avds`, (error: any, stdout: string) => {
      if (error) {
        throw new Error("Error occured when reading available avds");
      } else {
        setAvailableAvds(stdout.split("\n").filter((item: string) => item));
      }
    });
  }, []);

  const handlOnAction = (item: string) => {
    // Open emulator with selected avd
    exec(`${EMULATOR_LINK} -avd ${item}`);
  };

  return (
    <List>
      {availableAvds.map((avd) => (
        <List.Item
          key={avd}
          title={avd}
          actions={
            <ActionPanel>
              <Action title="Select" onAction={() => handlOnAction(avd)} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
