export const generateTimeSlots = (
  startHour: number,
  endHour: number,
  duration: number
): string[] => {
  const slots: string[] = [];

  let current = startHour * 60; // minutes
  const end = endHour * 60;

  while (current + duration <= end) {
    const startH = Math.floor(current / 60);
    const startM = current % 60;

    const endTime = current + duration;
    const endH = Math.floor(endTime / 60);
    const endM = endTime % 60;

    const slot = `${pad(startH)}:${pad(startM)} - ${pad(endH)}:${pad(endM)}`;
    slots.push(slot);

    current += duration;
  }

  return slots;
};

const pad = (n: number) => (n < 10 ? `0${n}` : n.toString());
