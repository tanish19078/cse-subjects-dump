# Disk Scheduling Algorithms

Disk scheduling is an operating system technique used to decide the order in which pending disk I/O requests should be served.

In traditional magnetic disks, the disk head has to move from one cylinder or track to another. This movement takes time. Disk scheduling algorithms try to reduce the total head movement and improve performance.

## Basic Terms

| Term | Meaning |
|---|---|
| Disk head | The part of the disk drive that reads or writes data |
| Track / Cylinder | A numbered location on the disk |
| Request queue | List of disk locations waiting to be served |
| Initial head position | The current position of the disk head |
| Seek time | Time required to move the head from one track to another |
| Head movement | Distance moved by the disk head |
| Disk range | Lowest and highest track numbers, such as `0 to 199` |

## Important Formula

For each movement:

```text
Head movement = |current head position - next request|
```

Total head movement:

```text
Total head movement = sum of all individual head movements
```

Average seek time:

```text
Average seek time = total head movement / number of requests
```

## Common Example Used Throughout

We will use the same example for all algorithms.

```text
Request queue: 98, 183, 37, 122, 14, 124, 65, 67
Initial head position: 53
Disk range: 0 to 199
Initial direction: toward higher track numbers
```

Sorted request queue:

```text
14, 37, 65, 67, 98, 122, 124, 183
```

Requests lower than `53`:

```text
14, 37
```

Requests higher than `53`:

```text
65, 67, 98, 122, 124, 183
```

# 1. FCFS Disk Scheduling

FCFS stands for First Come First Serve.

In this algorithm, disk requests are served in the exact order in which they arrive.

## Idea

The disk head does not try to choose the nearest request. It simply follows the request queue from left to right.

## Steps To Solve FCFS

1. Write the initial head position.
2. Write the request queue in the same order as given.
3. Move the head from the current position to the first request.
4. Continue moving from one request to the next request.
5. Add all absolute differences.

## Example

Given:

```text
Initial head = 53
Queue = 98, 183, 37, 122, 14, 124, 65, 67
```

Service order:

```text
53 -> 98 -> 183 -> 37 -> 122 -> 14 -> 124 -> 65 -> 67
```

Calculation:

```text
|98 - 53|  = 45
|183 - 98| = 85
|37 - 183| = 146
|122 - 37| = 85
|14 - 122| = 108
|124 - 14| = 110
|65 - 124| = 59
|67 - 65|  = 2
```

Total head movement:

```text
45 + 85 + 146 + 85 + 108 + 110 + 59 + 2 = 640
```

Answer:

```text
Total head movement = 640 cylinders
```

## Advantages

- Very simple to understand and implement.
- Fair, because requests are served in arrival order.
- No starvation.

## Disadvantages

- Can cause very large head movement.
- Poor performance when requests are scattered across the disk.
- Does not optimize seek time.

# 2. SSTF Disk Scheduling

SSTF stands for Shortest Seek Time First.

In this algorithm, the request closest to the current head position is served first.

## Idea

At every step, select the pending request that requires the minimum head movement.

## Steps To Solve SSTF

1. Start from the initial head position.
2. Find the request nearest to the current head.
3. Move the head to that request.
4. Remove that request from the pending queue.
5. Repeat until all requests are served.
6. Add all head movements.

## Example

Initial head:

```text
53
```

Pending requests:

```text
98, 183, 37, 122, 14, 124, 65, 67
```

Step-by-step selection:

| Current head | Nearest request | Movement |
|---:|---:|---:|
| 53 | 65 | `|65 - 53| = 12` |
| 65 | 67 | `|67 - 65| = 2` |
| 67 | 37 | `|37 - 67| = 30` |
| 37 | 14 | `|14 - 37| = 23` |
| 14 | 98 | `|98 - 14| = 84` |
| 98 | 122 | `|122 - 98| = 24` |
| 122 | 124 | `|124 - 122| = 2` |
| 124 | 183 | `|183 - 124| = 59` |

Service order:

```text
53 -> 65 -> 67 -> 37 -> 14 -> 98 -> 122 -> 124 -> 183
```

Calculation:

```text
12 + 2 + 30 + 23 + 84 + 24 + 2 + 59 = 236
```

Answer:

```text
Total head movement = 236 cylinders
```

## Advantages

- Usually gives better performance than FCFS.
- Reduces average seek time.
- Easy to understand.

## Disadvantages

- Can cause starvation.
- Requests far away from the current head may wait for a long time.
- Not always globally optimal, because it only makes a local best choice.

# 3. SCAN Disk Scheduling

SCAN is also called the Elevator Algorithm.

In this algorithm, the disk head moves in one direction, serves all requests in that direction, goes to the end of the disk, then reverses direction.

## Idea

It works like an elevator. An elevator keeps moving in one direction and serves floors on the way. After reaching the end, it reverses.

## Steps To Solve SCAN

1. Sort all disk requests.
2. Note the initial head position.
3. Note the direction of movement.
4. Serve all requests in that direction.
5. Continue moving to the physical end of the disk.
6. Reverse direction.
7. Serve the remaining requests.
8. Add all head movements.

## Example

Given:

```text
Initial head = 53
Direction = higher track numbers
Disk range = 0 to 199
```

Requests greater than `53`:

```text
65, 67, 98, 122, 124, 183
```

Requests less than `53`:

```text
37, 14
```

Since direction is toward higher numbers, serve higher requests first, then go to disk end `199`, then reverse.

Service order:

```text
53 -> 65 -> 67 -> 98 -> 122 -> 124 -> 183 -> 199 -> 37 -> 14
```

Detailed calculation:

```text
|65 - 53|   = 12
|67 - 65|   = 2
|98 - 67|   = 31
|122 - 98|  = 24
|124 - 122| = 2
|183 - 124| = 59
|199 - 183| = 16
|37 - 199|  = 162
|14 - 37|   = 23
```

Total:

```text
12 + 2 + 31 + 24 + 2 + 59 + 16 + 162 + 23 = 331
```

Shortcut:

```text
(199 - 53) + (199 - 14)
= 146 + 185
= 331
```

Answer:

```text
Total head movement = 331 cylinders
```

## Advantages

- Better than FCFS for heavy disk load.
- More systematic movement.
- Avoids too much back-and-forth movement.

## Disadvantages

- Requests just behind the head may have to wait.
- Head goes to the physical end even if there is no request there.
- Direction affects the answer.

# 4. C-SCAN Disk Scheduling

C-SCAN stands for Circular SCAN.

In this algorithm, the disk head moves in only one direction. After reaching the end, it jumps to the beginning of the disk and continues in the same direction.

## Idea

C-SCAN treats the disk like a circular list. It gives more uniform waiting time than SCAN.

## Steps To Solve C-SCAN

1. Sort all disk requests.
2. Note the initial head position.
3. Note the direction of movement.
4. Serve requests in the given direction.
5. Move to the physical end of the disk.
6. Jump to the opposite physical end.
7. Continue serving requests in the same direction.
8. Add all head movements, including the jump from one end to the other.

## Example

Given:

```text
Initial head = 53
Direction = higher track numbers
Disk range = 0 to 199
```

Service order:

```text
53 -> 65 -> 67 -> 98 -> 122 -> 124 -> 183 -> 199 -> 0 -> 14 -> 37
```

Detailed calculation:

```text
|65 - 53|   = 12
|67 - 65|   = 2
|98 - 67|   = 31
|122 - 98|  = 24
|124 - 122| = 2
|183 - 124| = 59
|199 - 183| = 16
|0 - 199|   = 199
|14 - 0|    = 14
|37 - 14|   = 23
```

Total:

```text
12 + 2 + 31 + 24 + 2 + 59 + 16 + 199 + 14 + 23 = 382
```

Shortcut:

```text
(199 - 53) + (199 - 0) + (37 - 0)
= 146 + 199 + 37
= 382
```

Answer:

```text
Total head movement = 382 cylinders
```

## Advantages

- Provides more uniform waiting time than SCAN.
- Good for systems with heavy disk traffic.
- Prevents unfair preference for middle cylinders.

## Disadvantages

- More head movement than LOOK or C-LOOK in many cases.
- The jump from one end to the other adds extra movement.
- May be inefficient if there are no requests near the disk ends.

# 5. LOOK Disk Scheduling

LOOK is an improved version of SCAN.

In SCAN, the head goes to the physical end of the disk. In LOOK, the head goes only up to the last request in the current direction, then reverses.

## Idea

The head "looks" ahead to check whether there are any more requests. If there are no more requests in that direction, it reverses immediately.

## Steps To Solve LOOK

1. Sort all disk requests.
2. Note the initial head position.
3. Note the direction.
4. Serve all requests in that direction.
5. Stop at the last request in that direction.
6. Reverse direction.
7. Serve the remaining requests.
8. Add all head movements.

## Example

Given:

```text
Initial head = 53
Direction = higher track numbers
```

Higher requests:

```text
65, 67, 98, 122, 124, 183
```

Lower requests:

```text
37, 14
```

Service order:

```text
53 -> 65 -> 67 -> 98 -> 122 -> 124 -> 183 -> 37 -> 14
```

Detailed calculation:

```text
|65 - 53|   = 12
|67 - 65|   = 2
|98 - 67|   = 31
|122 - 98|  = 24
|124 - 122| = 2
|183 - 124| = 59
|37 - 183|  = 146
|14 - 37|   = 23
```

Total:

```text
12 + 2 + 31 + 24 + 2 + 59 + 146 + 23 = 299
```

Shortcut:

```text
(183 - 53) + (183 - 14)
= 130 + 169
= 299
```

Answer:

```text
Total head movement = 299 cylinders
```

## Advantages

- More efficient than SCAN in many cases.
- Does not move unnecessarily to the disk end.
- Reduces total head movement.

## Disadvantages

- Direction still affects performance.
- Slightly more complex than FCFS and SSTF.
- Requests behind the head may still wait until reversal.

# 6. C-LOOK Disk Scheduling

C-LOOK stands for Circular LOOK.

It is an improved version of C-SCAN. The head moves in one direction and serves requests. After reaching the last request in that direction, it jumps to the first request at the other end and continues in the same direction.

## Idea

C-LOOK avoids going to the physical disk ends unless there is an actual request there.

## Steps To Solve C-LOOK

1. Sort all disk requests.
2. Note the initial head position.
3. Note the direction.
4. Serve all requests in the given direction.
5. Stop at the last request in that direction.
6. Jump to the lowest pending request.
7. Continue serving requests in the same direction.
8. Add all head movements, including the jump from the highest request to the lowest request.

## Example

Given:

```text
Initial head = 53
Direction = higher track numbers
```

Service order:

```text
53 -> 65 -> 67 -> 98 -> 122 -> 124 -> 183 -> 14 -> 37
```

Detailed calculation:

```text
|65 - 53|   = 12
|67 - 65|   = 2
|98 - 67|   = 31
|122 - 98|  = 24
|124 - 122| = 2
|183 - 124| = 59
|14 - 183|  = 169
|37 - 14|   = 23
```

Total:

```text
12 + 2 + 31 + 24 + 2 + 59 + 169 + 23 = 322
```

Shortcut:

```text
(183 - 53) + (183 - 14) + (37 - 14)
= 130 + 169 + 23
= 322
```

Answer:

```text
Total head movement = 322 cylinders
```

## Important Note

Some teachers do not count the circular jump in C-SCAN and C-LOOK because they treat it as a reset movement. However, most operating system numerical problems count it as head movement.

If your teacher uses a different convention, mention it clearly in the answer.

## Advantages

- Better than C-SCAN because it avoids unnecessary movement to disk ends.
- Gives uniform waiting time.
- Efficient for large request queues.

## Disadvantages

- More complex than FCFS.
- Jump movement can be large.
- Direction affects the service order.

# Summary Table

Using the same example:

```text
Queue = 98, 183, 37, 122, 14, 124, 65, 67
Initial head = 53
Disk range = 0 to 199
Direction = higher track numbers
```

| Algorithm | Service Order | Total Head Movement |
|---|---|---:|
| FCFS | `53 -> 98 -> 183 -> 37 -> 122 -> 14 -> 124 -> 65 -> 67` | 640 |
| SSTF | `53 -> 65 -> 67 -> 37 -> 14 -> 98 -> 122 -> 124 -> 183` | 236 |
| SCAN | `53 -> 65 -> 67 -> 98 -> 122 -> 124 -> 183 -> 199 -> 37 -> 14` | 331 |
| C-SCAN | `53 -> 65 -> 67 -> 98 -> 122 -> 124 -> 183 -> 199 -> 0 -> 14 -> 37` | 382 |
| LOOK | `53 -> 65 -> 67 -> 98 -> 122 -> 124 -> 183 -> 37 -> 14` | 299 |
| C-LOOK | `53 -> 65 -> 67 -> 98 -> 122 -> 124 -> 183 -> 14 -> 37` | 322 |

# How To Solve Any Disk Scheduling Problem

Follow this exam method:

1. Write the given request queue.
2. Write the initial head position.
3. Write the disk range, if given.
4. Write the initial direction, if given.
5. Sort the request queue for all algorithms except FCFS.
6. Divide requests into two parts:
   - requests lower than the initial head
   - requests higher than the initial head
7. Decide the service order according to the algorithm.
8. Calculate movement using absolute difference.
9. Add all movements.
10. Write the final answer in cylinders.

# Algorithm Selection Guide

| Algorithm | Best Feature | Main Problem |
|---|---|---|
| FCFS | Simple and fair | Very high head movement |
| SSTF | Low seek time | Starvation possible |
| SCAN | Systematic movement | Goes to disk end unnecessarily |
| C-SCAN | Uniform waiting time | Extra circular jump |
| LOOK | Avoids unnecessary end movement | Direction still matters |
| C-LOOK | Efficient circular movement | Jump can still be large |

# Common Mistakes

1. Forgetting to include the initial head position.
2. Sorting the queue for FCFS. FCFS should not be sorted.
3. Forgetting the disk end in SCAN and C-SCAN.
4. Adding disk end in LOOK and C-LOOK. LOOK algorithms stop at the last request, not the physical end.
5. Ignoring the given direction.
6. Not counting the jump in C-SCAN or C-LOOK when the problem expects it.
7. Using normal subtraction instead of absolute difference.

# Quick Revision

```text
FCFS   = Serve in arrival order
SSTF   = Serve nearest request first
SCAN   = Move to disk end, reverse
C-SCAN = Move to disk end, jump to other end
LOOK   = Move to last request, reverse
C-LOOK = Move to last request, jump to first request
```

# Practice Problem

Solve using FCFS, SSTF, SCAN, C-SCAN, LOOK, and C-LOOK:

```text
Request queue: 82, 170, 43, 140, 24, 16, 190
Initial head position: 50
Disk range: 0 to 199
Direction: higher track numbers
```

Suggested solving format:

```text
Algorithm:
Service order:
Calculation:
Total head movement:
```

