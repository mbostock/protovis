for (int i = 0; i < data.length; i++) {
  fill(data[i] * 120);
  float ang = data[i] / sum * 2 * PI;
  arc(75, 75, 140, 140, lastAng, lastAng + ang);
  lastAng += ang;
}
